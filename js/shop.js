const SHOP_ITEMS = [
    {
        id: 1,
        name: "Skin Merah",
        description: "Karakter berwarna merah cerah",
        price: 50,
        type: "skin",
        color: "#FF6B6B"
    },
    {
        id: 2,
        name: "Skin Biru",
        description: "Karakter berwarna biru muda",
        price: 50,
        type: "skin",
        color: "#4ECDC4"
    },
    {
        id: 3,
        name: "Skin Hijau",
        description: "Karakter berwarna hijau",
        price: 75,
        type: "skin",
        color: "#95E1D3"
    },
    {
        id: 4,
        name: "Skin Oranye",
        description: "Karakter berwarna oranye",
        price: 75,
        type: "skin",
        color: "#FFB86C"
    },
    {
        id: 5,
        name: "Skin Ungu",
        description: "Karakter berwarna ungu misterius",
        price: 100,
        type: "skin",
        color: "#B19CD9"
    },
    {
        id: 6,
        name: "Skin Emas",
        description: "Karakter berwarna emas premium",
        price: 200,
        type: "skin",
        color: "#FFD700"
    }
];

class Shop {
    constructor() {
        this.items = SHOP_ITEMS;
        this.ownedItems = [];
    }

    buyItem(itemId, coins) {
        let item = this.items.find(i => i.id === itemId);
        
        if (!item) {
            return { success: false, message: "Item tidak ditemukan!" };
        }

        if (coins < item.price) {
            return { success: false, message: "Koin tidak cukup! Butuh " + item.price + " koin." };
        }

        if (this.ownedItems.includes(itemId)) {
            return { success: false, message: "Kamu sudah memiliki item ini!" };
        }

        this.ownedItems.push(itemId);
        return { success: true, message: "Berhasil membeli " + item.name + "!" };
    }

    isOwned(itemId) {
        return this.ownedItems.includes(itemId);
    }

    getOwnedSkins() {
        return this.ownedItems.filter(id => {
            let item = this.items.find(i => i.id === id);
            return item && item.type === 'skin';
        });
    }

    renderShop() {
        let shopHTML = '';
        for (let item of this.items) {
            let isOwned = this.isOwned(item.id);
            let buttonText = isOwned ? '✓ Dimiliki' : item.price + ' Koin';
            let buttonClass = isOwned ? 'btn-owned' : '';

            shopHTML += `
                <div class="shop-item ${buttonClass}" onclick="shop.selectItem(${item.id})">
                    <div style="width: 40px; height: 40px; background: ${item.color}; border-radius: 4px; margin: 0 auto 5px; border: 2px solid #333;"></div>
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <div class="price">${buttonText}</div>
                </div>
            `;
        }
        return shopHTML;
    }

    selectItem(itemId) {
        let item = this.items.find(i => i.id === itemId);
        if (!item) return;

        if (item.type === 'skin') {
            if (this.isOwned(item.id)) {
                player.setSkinColor(item.color);
                alert("Menggunakan " + item.name);
            } else {
                alert("Kamu harus membeli item ini terlebih dahulu!");
            }
        }
    }
}