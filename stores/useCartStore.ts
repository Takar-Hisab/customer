import { defineStore } from "pinia";

interface CartItem {
    sku: string;
    quantity: number;
    selectSku: {
        id: string;
        selectQty: number;
    };
    buyQty: number,
    price: number;
}

interface CartState {
    cart: CartItem[];
}

export const useCartStore = defineStore({
    id: 'cart',
    state: (): CartState => ({
        cart: []
    }),

    actions: {
        addToCart(data: CartItem) {
            const index = this.cart.findIndex(item => item?.sku === data?.sku);
            if (index > -1) {
                this.cart[index].buyQty++;
            } else {
                this.cart.push(data);
            }
        },

        removeFromCart(item: CartItem) {
            const index = this.cart.indexOf(item);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
        },

        decrementQty(data: CartItem) {
            const index = this.cart.findIndex(item => item?.sku === data?.sku);
            if (index > -1 && this.cart[index].buyQty > 1) {
                this.cart[index].buyQty--;
            }
        },

        clearCart(isToast: boolean = true) {
            this.cart = [];
        }
    },

    getters: {
        getCartLength(): number {
            return this.cart.length;
        },
        getCartItems(): CartItem[] {
            return this.cart;
        },
        getCartTotalPrice(): number {
            return this.cart.reduce((total, item) => total + item.price * item.buyQty, 0);
        }
    },
    persist: true
});
