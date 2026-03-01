/**
 * Akbar Sanitary Store – Cart Manager
 * Uses localStorage to persist cart items across pages.
 */

const Cart = {
    STORAGE_KEY: 'akbar_cart',

    getItems() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        } catch { return []; }
    },

    save(items) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        this.updateBadge();
    },

    addItem(product) {
        // product: { id, name, image, price, oldPrice, size, quantity }
        const items = this.getItems();
        const key = product.id + (product.size ? '_' + product.size : '');
        const existing = items.find(i => i.key === key);
        if (existing) {
            existing.quantity += product.quantity;
        } else {
            items.push({ ...product, key });
        }
        this.save(items);
    },

    removeItem(key) {
        const items = this.getItems().filter(i => i.key !== key);
        this.save(items);
    },

    updateQuantity(key, qty) {
        const items = this.getItems();
        const item = items.find(i => i.key === key);
        if (item) {
            item.quantity = Math.max(1, qty);
            this.save(items);
        }
    },

    getCount() {
        return this.getItems().reduce((acc, i) => acc + i.quantity, 0);
    },

    getTotal() {
        return this.getItems().reduce((acc, i) => acc + i.price * i.quantity, 0);
    },

    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.updateBadge();
    },

    updateBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = this.getCount();
        badges.forEach(b => {
            b.textContent = count;
            b.style.display = count > 0 ? 'flex' : 'none';
        });
    }
};

// Update badge on every page load
document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());
