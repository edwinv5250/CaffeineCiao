const IMG = {
    p(id) {
        return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`;
    },
    u(id) {
        return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=600&q=80`;
    },
};

const FALLBACK_IMAGE = IMG.p(302899);

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
                image: IMG.u('1447933601403-0c6688de566e'),
                soon: false,
            },
            {
                id: 'bean-colombia',
                name: 'Colombia Huila',
                description: 'Milk chocolate, caramel, and red apple. Balanced everyday drip.',
                price: 65,
                image: IMG.u('1559056199-641a0ac8b55e'),
                soon: false,
            },
            {
                id: 'bean-kenya',
                name: 'Kenya AA',
                description: 'Blackcurrant, grapefruit, and brown sugar. Bright and juicy.',
                price: 78,
                image: IMG.u('1495474472287-4d71bcdd2085'),
                soon: false,
            },
            {
                id: 'bean-brazil',
                name: 'Brazil Santos',
                description: 'Nutty, cocoa, and low acidity. Suited to espresso blends.',
                price: 58,
                image: IMG.p(1695052),
                soon: false,
            },
            {
                id: 'bean-guatemala',
                name: 'Guatemala Antigua',
                description: 'Honey, dark chocolate, and spice. Full-bodied cup.',
                price: 70,
                image: IMG.p(585752),
                soon: false,
            },
            {
                id: 'bean-indonesia',
                name: 'Indonesia Sumatra',
                description: 'Earthy, cedar, and dark cocoa. Heavy body, low brightness.',
                price: 62,
                image: IMG.p(4109744),
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
                image: IMG.p(6612574),
                soon: false,
            },
            {
                id: 'drip-origami',
                name: 'Origami Dripper + Filter Paper',
                description: 'S-size brewer with ribbed walls for even extraction.',
                price: 145,
                image: IMG.p(3779031),
                soon: false,
            },
            {
                id: 'drip-bluebottle',
                name: 'Blue Bottle Dripper',
                description: 'Flat-bottom profile for consistent, sweet cups.',
                price: 120,
                image: IMG.p(4912375),
                soon: false,
            },
            {
                id: 'drip-moka',
                name: 'Bialetti Moka Pot',
                description: 'Classic 6-cup stovetop brewer with espresso character.',
                price: 185,
                image: IMG.p(206253),
                soon: false,
            },
            {
                id: 'drip-chemex',
                name: 'Chemex Classic',
                description: '6-cup glass brewer with bonded filters (40 pack).',
                price: 210,
                image: IMG.p(894695),
                soon: false,
            },
            {
                id: 'drip-aeropress',
                name: 'AeroPress Go',
                description: 'Travel immersion brewer with mug and filter kit.',
                price: 135,
                image: IMG.p(2396220),
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
                description: '250 ml matte glaze — warm in hand, neutral on the palate.',
                price: 48,
                image: IMG.p(1566416),
                soon: false,
            },
            {
                id: 'cup-glass',
                name: 'Double-Wall Glass Cup',
                description: '200 ml insulated glass for latte art and heat retention.',
                price: 55,
                image: IMG.p(302899),
                soon: false,
            },
            {
                id: 'cup-hario-server',
                name: 'Hario Range Server',
                description: '600 ml heat-resistant glass server with handle.',
                price: 88,
                image: IMG.u('1509042239860-f550ce710b93'),
                soon: false,
            },
            {
                id: 'cup-kalita',
                name: 'Kalita Wave Server',
                description: '300 ml stackable server for wave and V60 brews.',
                price: 75,
                image: IMG.u('1442512595331-e89e73853f31'),
                soon: false,
            },
            {
                id: 'cup-stoneware',
                name: 'Stoneware Mug Set (2)',
                description: '350 ml speckled pair — dishwasher and microwave safe.',
                price: 95,
                image: IMG.p(3779031),
                soon: false,
            },
            {
                id: 'cup-borosilicate',
                name: 'Borosilicate Server 600 ml',
                description: 'Minimal glass server with pour spout for sharing.',
                price: 68,
                image: IMG.u('1578662996442-48f60103fc96'),
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
                description: 'Electric gooseneck with variable temperature control.',
                price: 689,
                image: IMG.p(2131969),
                soon: false,
            },
            {
                id: 'kettle-buono',
                name: 'Hario Buono Kettle',
                description: '1.2 L stovetop gooseneck — a pour-over staple.',
                price: 165,
                image: IMG.p(894695),
                soon: false,
            },
            {
                id: 'kettle-timemore',
                name: 'Timemore Fish Kettle',
                description: 'Stainless gooseneck with a steady, balanced pour.',
                price: 220,
                image: IMG.p(6612574),
                soon: false,
            },
            {
                id: 'kettle-basic',
                name: 'Basic Gooseneck Kettle',
                description: '0.9 L stovetop kettle for everyday home brewing.',
                price: 89,
                image: IMG.p(2396220),
                soon: false,
            },
            {
                id: 'kettle-slot5',
                name: 'Electric Kettle Pro',
                description: 'Reserved — temperature-stable kettle arriving soon.',
                price: 0,
                image: '',
                soon: true,
            },
            {
                id: 'kettle-slot6',
                name: 'Copper Finish Kettle',
                description: 'Reserved — limited design drop.',
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
                description: 'Instant-read probe for water and milk.',
                price: 45,
                image: IMG.p(302899),
                soon: false,
            },
            {
                id: 'acc-wdt',
                name: 'WDT Tool (Needle Distributor)',
                description: 'Reduces clumping and channels in espresso pucks.',
                price: 35,
                image: IMG.p(4912375),
                soon: false,
            },
            {
                id: 'acc-scale',
                name: 'Coffee Scale',
                description: '0.1 g precision with timer — USB rechargeable.',
                price: 128,
                image: IMG.p(4109744),
                soon: false,
            },
            {
                id: 'acc-mat',
                name: 'Counter Mat (Rubber)',
                description: 'Non-slip tamping mat that protects your counter.',
                price: 42,
                image: IMG.p(585752),
                soon: false,
            },
            {
                id: 'acc-tamper',
                name: 'Tamper 58 mm',
                description: 'Flat base tamper with hardwood handle.',
                price: 55,
                image: IMG.p(1695052),
                soon: false,
            },
            {
                id: 'acc-canister',
                name: 'Bean Storage Canister',
                description: 'Airtight UV-blocking canister with CO₂ valve.',
                price: 78,
                image: IMG.u('1447933601403-0c6688de566e'),
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
                <img src="${product.image}" alt="${product.name}" loading="lazy" width="800" height="600" decoding="async" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';">
           </div>`;

    const priceBlock = product.soon
        ? `<span class="price price--soon">Soon</span>`
        : `<span class="price">RM ${product.price.toFixed(2)}</span>`;

    const dataAttrs = `
                data-id="${product.id}"
                data-name="${product.name}"
                data-price="${product.price}"
                data-category="${categoryTitle}"
                data-image="${product.image}"`;

    const buttonBlock = product.soon
        ? `<button type="button" class="add-btn" disabled>Coming Soon</button>`
        : `<div class="product-actions">
                <button type="button" class="add-btn"${dataAttrs}>Add to Cart</button>
                <a href="checkout.html" class="checkout-btn" aria-label="Go to checkout">
                    <svg class="checkout-btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7.16 14l.84-2h8.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0021.33 3H6.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 13.37 5.48 15 7 15h12v-2H7.42l-.26-.48z"/>
                    </svg>
                </a>
           </div>`;

    const description = product.soon
        ? 'A new piece is on its way — follow us on Instagram for the release.'
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

function initCategorySliders() {
    document.querySelectorAll('.collection-category').forEach((cat) => {
        const seeAll = cat.querySelector('.category-see-all');
        if (!seeAll) return;

        seeAll.addEventListener('click', () => {
            const expanded = cat.classList.toggle('is-expanded');
            seeAll.textContent = expanded ? 'Show Less' : 'See All';

            const row = cat.closest('.shop-row');
            if (row) {
                row.querySelectorAll('.collection-category').forEach((sibling) => {
                    if (sibling !== cat) {
                        sibling.classList.toggle('is-sibling-hidden', expanded);
                    }
                });
            }

            if (!expanded) {
                cat.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCollections();
    initProductCartControls();
    initCategorySliders();
});
