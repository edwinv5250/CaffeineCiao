const COLLECTIONS = [
    {
        id: 'coffee-beans',
        title: 'Coffee Beans',
        products: [
            {
                id: 'bean-ethiopia',
                name: 'Ethiopia Yirgacheffe',
                description: 'Floral, bergamot, and blueberry. Washed single-origin, light–medium roast.',
                price: 72,
                image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
                soon: false,
            },
            {
                id: 'bean-colombia',
                name: 'Colombia Huila',
                description: 'Milk chocolate, caramel, and red apple. Balanced everyday drip.',
                price: 65,
                image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
                soon: false,
            },
            {
                id: 'bean-kenya',
                name: 'Kenya AA',
                description: 'Blackcurrant, grapefruit, and brown sugar. Bright and juicy.',
                price: 78,
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
                soon: false,
            },
            {
                id: 'bean-brazil',
                name: 'Brazil Santos',
                description: 'Nutty, cocoa, and low acidity. Great for espresso blends.',
                price: 58,
                image: 'https://images.unsplash.com/photo-1611854778013-56161a88b503?w=600&q=80',
                soon: false,
            },
            {
                id: 'bean-guatemala',
                name: 'Guatemala Antigua',
                description: 'Honey, dark chocolate, and spice. Full-bodied cup.',
                price: 70,
                image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefad?w=600&q=80',
                soon: false,
            },
            {
                id: 'bean-indonesia',
                name: 'Indonesia Sumatra',
                description: 'Earthy, cedar, and dark cocoa. Heavy body, low brightness.',
                price: 62,
                image: 'https://images.unsplash.com/photo-1461023058943-07fcbe716ec0?w=600&q=80',
                soon: false,
            },
        ],
    },
    {
        id: 'drippers',
        title: 'Dripper',
        products: [
            {
                id: 'drip-v60',
                name: 'Hario V60 + Filter Paper',
                description: '02 ceramic dripper with 100-count bleached filters.',
                price: 95,
                image: 'https://images.unsplash.com/photo-1497934476412-10ddca8122da?w=600&q=80',
                soon: false,
            },
            {
                id: 'drip-origami',
                name: 'Origami Dripper + Filter Paper',
                description: 'S-size brewer with ribbed design for even extraction.',
                price: 145,
                image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
                soon: false,
            },
            {
                id: 'drip-bluebottle',
                name: 'Blue Bottle Dripper',
                description: 'Flat-bottom dripper for consistent, sweet cups.',
                price: 120,
                image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80',
                soon: false,
            },
            {
                id: 'drip-moka',
                name: 'Bialetti Moka Pot',
                description: 'Classic 6-cup stovetop espresso-style brewer.',
                price: 185,
                image: 'https://images.unsplash.com/photo-1510591509098-110eb351b51f?w=600&q=80',
                soon: false,
            },
            {
                id: 'drip-chemex',
                name: 'Chemex Classic',
                description: '6-cup glass brewer with bonded filters (40 pack).',
                price: 210,
                image: 'https://images.unsplash.com/photo-1511920170033-f8396924c10b?w=600&q=80',
                soon: false,
            },
            {
                id: 'drip-aeropress',
                name: 'AeroPress Go',
                description: 'Travel-friendly immersion brewer with mug and filters.',
                price: 135,
                image: 'https://images.unsplash.com/photo-1559497218-9e88cbe0b1b0?w=600&q=80',
                soon: false,
            },
        ],
    },
    {
        id: 'cups-servers',
        title: 'Coffee Cup / Server',
        products: [
            {
                id: 'cup-ceramic',
                name: 'Handmade Ceramic Cup',
                description: '250 ml matte glaze cup — warm in hand, neutral profile.',
                price: 48,
                image: 'https://images.unsplash.com/photo-1515823064-d6e640fe0f7e?w=600&q=80',
                soon: false,
            },
            {
                id: 'cup-glass',
                name: 'Double-Wall Glass Cup',
                description: 'Insulated 200 ml cup for latte art and heat retention.',
                price: 55,
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
                soon: false,
            },
            {
                id: 'cup-hario-server',
                name: 'Hario Range Server',
                description: '600 ml heat-resistant glass server with handle.',
                price: 88,
                image: 'https://images.unsplash.com/photo-1497934476412-10ddca8122da?w=600&q=80',
                soon: false,
            },
            {
                id: 'cup-kalita',
                name: 'Kalita Wave Server',
                description: '300 ml stackable server for wave and V60 brews.',
                price: 75,
                image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80',
                soon: false,
            },
            {
                id: 'cup-stoneware',
                name: 'Stoneware Mug Set (2)',
                description: '350 ml speckled mugs — dishwasher safe, microwave safe.',
                price: 95,
                image: 'https://images.unsplash.com/photo-1510591509098-110eb351b51f?w=600&q=80',
                soon: false,
            },
            {
                id: 'cup-borosilicate',
                name: 'Borosilicate Server 600 ml',
                description: 'Minimal glass server with pour spout for sharing brews.',
                price: 68,
                image: 'https://images.unsplash.com/photo-1511920170033-f8396924c10b?w=600&q=80',
                soon: false,
            },
        ],
    },
    {
        id: 'kettles',
        title: 'Kettle',
        products: [
            {
                id: 'kettle-stagg',
                name: 'Fellow Stagg EKG',
                description: 'Electric gooseneck kettle with variable temperature control.',
                price: 689,
                image: 'https://images.unsplash.com/photo-1559497218-9e88cbe0b1b0?w=600&q=80',
                soon: false,
            },
            {
                id: 'kettle-buono',
                name: 'Hario Buono Kettle',
                description: '1.2 L stovetop gooseneck — classic pour-over staple.',
                price: 165,
                image: 'https://images.unsplash.com/photo-1497934476412-10ddca8122da?w=600&q=80',
                soon: false,
            },
            {
                id: 'kettle-timemore',
                name: 'Timemore Fish Kettle',
                description: 'Stainless gooseneck with balanced pour and steady flow.',
                price: 220,
                image: 'https://images.unsplash.com/photo-1511920170033-f8396924c10b?w=600&q=80',
                soon: false,
            },
            {
                id: 'kettle-basic',
                name: 'Basic Gooseneck Kettle',
                description: 'Affordable 0.9 L stovetop kettle for home brewing.',
                price: 89,
                image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80',
                soon: false,
            },
            {
                id: 'kettle-slot5',
                name: 'Electric Kettle Pro',
                description: 'Reserved slot — premium temperature-stable kettle.',
                price: 0,
                image: '',
                soon: true,
            },
            {
                id: 'kettle-slot6',
                name: 'Copper Finish Kettle',
                description: 'Reserved slot — limited design drop.',
                price: 0,
                image: '',
                soon: true,
            },
        ],
    },
    {
        id: 'accessories',
        title: 'Small Accessories',
        products: [
            {
                id: 'acc-thermometer',
                name: 'Digital Thermometer',
                description: 'Instant-read probe for water and milk temperature.',
                price: 45,
                image: 'https://images.unsplash.com/photo-1559497218-9e88cbe0b1b0?w=600&q=80',
                soon: false,
            },
            {
                id: 'acc-wdt',
                name: 'WDT Tool (Needle Distributor)',
                description: 'Reduces clumping and channels in espresso pucks.',
                price: 35,
                image: 'https://images.unsplash.com/photo-1497934476412-10ddca8122da?w=600&q=80',
                soon: false,
            },
            {
                id: 'acc-scale',
                name: 'Coffee Scale',
                description: '0.1 g precision with timer — USB rechargeable.',
                price: 128,
                image: 'https://images.unsplash.com/photo-1611854778013-56161a88b503?w=600&q=80',
                soon: false,
            },
            {
                id: 'acc-mat',
                name: 'Counter Mat (Rubber)',
                description: 'Non-slip tamping mat — protects counters from spills.',
                price: 42,
                image: 'https://images.unsplash.com/photo-1461023058943-07fcbe716ec0?w=600&q=80',
                soon: false,
            },
            {
                id: 'acc-tamper',
                name: 'Tamper 58 mm',
                description: 'Flat base tamper with hardwood handle.',
                price: 55,
                image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
                soon: false,
            },
            {
                id: 'acc-canister',
                name: 'Bean Storage Canister',
                description: 'Airtight UV-blocking canister with CO₂ valve.',
                price: 78,
                image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
                soon: false,
            },
        ],
    },
];

function renderProductCard(product, categoryTitle) {
    const soonClass = product.soon ? ' product-card--soon' : '';
    const imageBlock = product.soon
        ? `<div class="product-image product-image--placeholder" aria-hidden="true"></div>`
        : `<div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" width="600" height="400">
           </div>`;

    const priceBlock = product.soon
        ? `<span class="price price--soon">Soon</span>`
        : `<span class="price">RM ${product.price.toFixed(2)}</span>`;

    const buttonBlock = product.soon
        ? `<button type="button" class="add-btn" disabled>Coming Soon</button>`
        : `<button type="button" class="add-btn"
                data-id="${product.id}"
                data-name="${product.name}"
                data-price="${product.price}"
                data-category="${categoryTitle}"
                data-image="${product.image}">Add to Cart</button>`;

    const description = product.soon
        ? 'New arrival slot — check back soon or follow us on Instagram.'
        : product.description;

    return `
        <article class="product-card${soonClass}">
            ${imageBlock}
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${description}</p>
                <div class="product-footer">
                    ${priceBlock}
                    ${buttonBlock}
                </div>
            </div>
        </article>
    `;
}

function renderCollections() {
    COLLECTIONS.forEach((category) => {
        const grid = document.querySelector(`[data-category="${category.id}"]`);
        if (!grid) return;
        grid.innerHTML = category.products
            .map((product) => renderProductCard(product, category.title))
            .join('');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCollections();
    initAddToCartButtons();
});
