import { StockService } from "@/use-cases/stock/StockService";
import { StockRepository } from "@/infra/repository/StockRepository";
import { MovimentoStockRepository } from "@/infra/repository/MovimentoStockRepository";

export function stockFactory() {
    const stockRepository = new StockRepository();
    const movimentoRepository = new MovimentoStockRepository();
    const usecase = new StockService(stockRepository, movimentoRepository);

    return usecase;
}
