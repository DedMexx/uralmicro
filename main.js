let map;

let promise = main().then(() => {
}).catch(error => {
    throw new Error('Yandex API error: ' + error);
});

async function main() {
    await ymaps3.ready;
    const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapControls,
        YMapCollection,
        YMapEntity,
        YMapFeatureDataSource,
        YMapLayer,
        YMapListener
    } = ymaps3;

    const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');
    const {YMapHint, YMapHintContext} = await ymaps3.import('@yandex/ymaps3-hint@0.0.1');

    let defaultFeatures;

    map = new YMap(document.querySelector('#map-wrapper'), {
        location: {
            center: TYUMEN_LOCATION, zoom: 13
        },
        zoomRange: ZOOM_RANGE,
        restrictMapArea: RESTRICT_AREA,
        behaviors: ['drag', 'pinchZoom', 'dblClick', 'magnifier']
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(defaultFeatures = new YMapDefaultFeaturesLayer());
    map.addChild(new YMapControls({position: 'right'}).addChild(new YMapZoomControl({})));
    map.addChild(new YMapFeatureDataSource({id: 'popups'}));
    map.addChild(new YMapLayer({source: 'popups'}));

    const markers = new YMapCollection({});
    const popups = new YMapCollection({});
    POINTS.forEach(({coordinates, hint, image}) => {
        const marker = new YMapMarker({coordinates, properties: {hint}});
        marker.element.innerHTML = markerSvg('#ff0000');
        let markerSVGContainer = marker.element.querySelector('.svg-container');
        markerSVGContainer.style.transform = 'translate(-15px, -33px)';
        markerSVGContainer.style.position = 'absolute';
        markerSVGContainer.style.cursor = 'pointer';
        markerSVGContainer.zIndex = '1';
        markerSVGContainer.addEventListener('click', markerClicked);

        function markerClicked() {
            if (marker.element.querySelector('.popup-container')) {
                closePopup();
            } else {
                const popupContainer = document.createElement('div');
                popupContainer.className = 'popup-container';
                popupContainer.innerHTML = `
        <div class="left-popup">
            <button class="popup-close">✖</button>
            <div class="popup-content-wrapper">
                <div class="popup-image-wrapper"><img src="images/${image}" alt="Изображение места в Тюмени"></div>
                <div class="popup-link-wrapper"><a href="https://www.google.com/search?q=Тюмень ${hint}">${hint}</a></div>
            </div>
        </div>`;
                popupContainer.querySelector('.popup-close').addEventListener('click', closePopup);
                popupContainer.querySelector('.popup-link-wrapper > a').addEventListener('click', redirect);
                marker.element.appendChild(popupContainer);
            }
        }

        function closePopup() {
            const popupContainer = marker.element.querySelector('.popup-container');
            if (popupContainer) {
                popupContainer.remove();
            }
        }

        function redirect() {
            window.open(`https://www.google.com/search?q=Тюмень ${hint}`);
        }

        markers.addChild(marker);
    });

    map.addChild(markers);
    // map.addChild(popups);

    map.addChild(hint = new YMapHint({
        layers: [defaultFeatures.layer],
        hint: object => object?.properties?.hint
    }));

    hint.addChild(new class MyHint extends YMapEntity {
        _onAttach() {
            this._element = document.createElement('div');
            this._element.className = 'my-hint';

            this._detachDom = ymaps3.useDomContext(this, this._element);
            this._watchContext(YMapHintContext, () => {
                this._element.textContent = this._consumeContext(YMapHintContext)?.hint;
            }, {immediate: true});
        }

        _onDetach() {
            this._detachDom();
        }
    });
}