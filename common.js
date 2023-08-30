// Расположение Тюмени
const TYUMEN_LOCATION = [65.537840, 57.151008];

// Ограничение зума
const ZOOM_RANGE = {min: 13, max: 19};

// Ограничение карты
const RESTRICT_AREA = [
    [65.409855, 57.070067],
    [65.703733, 57.243552]
];

// Места в Тюмени
const POINTS = [
    {
        coordinates: [65.537840, 57.151008],
        hint: 'Цветной бульвар',
        image: 'cb.jpg'
    },
    {
        coordinates: [65.532656, 57.153442],
        hint: 'Администрация города Тюмень',
        image: 'adm.jpg'
    },
    {
        coordinates: [65.521986, 57.164226],
        hint: 'Мост влюбленных',
        image: 'bridge.jpg'
    },
    {
        coordinates: [65.586909, 57.129984],
        hint: 'Дом культуры \"Строитель\"',
        image: 'dk.jpg'
    },
    {
        coordinates: [65.590758, 57.132179],
        hint: 'Сквер Школьный',
        image: 'school_skver.jpg'
    },
    {
        coordinates: [65.631166, 57.126026],
        hint: 'Гилевская роща',
        image: 'roshya.jpg'
    },
    {
        coordinates: [65.571698, 57.130579],
        hint: 'Пруд Утиный',
        image: 'utinniy.jpg'
    },
    {
        coordinates: [65.522948, 57.159246],
        hint: 'Институт математики и компьютерных технологий',
        image: 'imikn.jpg'
    }
]

// Маркер
const markerSvg = color => `
<div class="svg-container">
<svg width="29" height="34" viewBox="0 0 58 67" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter)">
        <path d="M34.342 49.376c-3.076.93-4.687 2.979-4.831 6.147a.5.5 0 0 1-.5.477h-.022a.5.5 0 0 1-.5-.477c-.144-3.168-1.755-5.217-4.831-6.147C13.53 46.968 6 37.863 6 27 6 14.297 16.297 4 29 4s23 10.297 23 23c0 10.863-7.531 19.968-17.658 22.376z" fill="${color}" />
    </g>
    <path d="M29 67a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#fff" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29 65a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="${color}" />
    <defs>
        <filter id="filter" x="0" y="0" width="58" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="3" />
            <feColorMatrix values="0 0 0 0 0.4 0 0 0 0 0.396078 0 0 0 0 0.380392 0 0 0 0.2 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_9595_81428" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_9595_81428" result="shape" />
        </filter>
    </defs>
</svg>
</div>
`;
