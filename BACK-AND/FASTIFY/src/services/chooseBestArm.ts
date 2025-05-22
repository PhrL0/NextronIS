import axios from "axios";
import { hyperParameterArmRepository } from "../infrastructure/repository/hyperparameterArmRepository";

export default async function chooseBestArm() {
    try {
        const arms = await hyperParameterArmRepository.getAllArms();
        
        const response = await axios.post("http://127.0.0.1:8000/bestArm", { arms });

        if (response.status === 200) {
            const bestArm = response.data.best_arm;
            return await hyperParameterArmRepository.getBestArm(bestArm);
        } else {
            throw new Error("O microserviço Python não respondeu com sucesso.");
        }
    } catch (err) {
        console.error("Erro interno na requisição ao microserviço:", err);
        throw err; 
    }
}
