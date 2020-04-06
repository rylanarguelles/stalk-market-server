import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Trade {
    @PrimaryGeneratedColumn()
    trade_id;

    @Column()
    buyPrice;

    @Column()
    buyDate;

    @Column()
    sellPrice;

    @Column()
    sellDate;

    @Column()
    sellPeriod;
}
