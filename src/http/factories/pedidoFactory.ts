import { PedidoService } from "@/use-cases/pedido/PedidoService";
import { PedidoRepository } from "@/infra/repository/PedidoRepository";
import { PedidoDoacaoRepository } from "@/infra/repository/PedidoDoacaoRepository";
import { PedidoEntreHospitaisRepository } from "@/infra/repository/PedidoEntreHospitaisRepository";

export function pedidoFactory() {
    const pedidoRepository = new PedidoRepository();
    const pedidoDoacaoRepository = new PedidoDoacaoRepository();
    const pedidoEntreHospitaisRepository = new PedidoEntreHospitaisRepository();
    
    const usecase = new PedidoService(
        pedidoRepository, 
        pedidoDoacaoRepository, 
        pedidoEntreHospitaisRepository
    );

    return usecase;
}
