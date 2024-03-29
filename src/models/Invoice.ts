import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, ManyToMany, JoinTable, ManyToOne, OneToMany} from "typeorm";
import { Order } from "./Order";


@Entity()
export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'timestamp' }) 
    date: Date;

    @ManyToOne(() => Order, order => order.invoice, { onDelete: 'CASCADE' })
    order: Order;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    
}