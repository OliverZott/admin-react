import { OrderItem } from "./OrderItem";

export class Order {
    constructor(
        public id: number,
        // public name: string,
        public name: string,
        public email: string,
        public total: number,
        public order_items: OrderItem[]
    ) {
    }
}