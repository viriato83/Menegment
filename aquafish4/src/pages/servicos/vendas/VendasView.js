import { useEffect, useState, useRef } from "react";
import Header from "../../../components/Header";
import Conteinner from "../../../components/Conteinner";
import Slider from "../../../components/Slider";
import Content from "../../../components/Content";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/modal";
import Mensagem from "../../../components/mensagem";
import Footer from "../../../components/Footer";
import { repositorioVenda } from "./vendasRepositorio";


export default function VendasView() {
  const repositorio = new repositorioVenda();
  const [modelo, setModelo] = useState([]);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState(""); // Estado para o ID digitado
  const navigate = useNavigate();

  const msg = useRef(null); // UseRef para manter uma instância estável
  const moda = useRef(null);

  useEffect(() => {
    // Inicializa as instâncias uma vez
    msg.current = new Mensagem();
    moda.current = new Modal();

    async function carregarDados() {
      try {
        const dadosModelo = await repositorio.leitura();
        const dadosTotal = await repositorio.total();
        setModelo(dadosModelo);
        setTotal(dadosTotal);
      } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
      }
    }
    carregarDados();
  }, []);

  return (
    <>
      <Header />
      <Conteinner>
        <Slider />
        <Content>
          <div className="tabela">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Data</th>
                  <th>Valor Total</th>
                  <th>Cliente</th>
                  <th>Mercadorias</th>
                  
                </tr>
              </thead>
              <tbody>
                {modelo.map((elemento, i) => (
                 <tr key={i}> 
                                    <td>{elemento.idvendas}</td>
                                    <td>{elemento.quantidade}</td>
                                    <td>{elemento.valor_uni} Mt </td>
                                    <td>{elemento.data}</td>
                                    <td>{elemento.valor_total.toLocaleString("pt-PT",{minimumFractionDigits:3})} Mt</td>
                                    <td>{elemento.cliente.nome} </td>
                                    <td>{elemento.mercadorias.map((elemento)=>{
                                        return `${elemento.idmercadoria} : ${elemento.nome}` 
                                        })} </td>
                             
                                    <td></td>
                                         
                                </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">Total</td>
                  <td>{total}</td>
                </tr>
              </tfoot>
            </table>
            <div className="crud">
              <button
                className="editar"
                onClick={() => {
                  if (id) {
                    moda.current.Abrir("Deseja editar o " + id);
                    document.querySelector(".sim").addEventListener("click", () => {
                      navigate(`/registar-venda/${id}`);
                    });
                    document.querySelector(".nao").addEventListener("click", () => {
                      moda.current.fechar();
                    });
                  } else {
                    msg.current.Erro("Por favor, digite um ID válido!");
                  }
                }}
              >
                Editar
              </button>
              <input
                type="number"
                className="crudid"
                placeholder="Digite o ID"
                value={id}
                onChange={(e) => setId(e.target.value)} // Atualiza o estado com o valor digitado
              />
              <button
                onClick={() => {
                  if (id) {
                    moda.current.Abrir("Deseja apagar o " + id);
                    document.querySelector(".sim").addEventListener("click", () => {
                      repositorio.deletar(id);
                      moda.current.fechar();
                    });
                    document.querySelector(".nao").addEventListener("click", () => {
                      moda.current.fechar();
                    });
                  } else {
                    msg.current.Erro("Por favor, digite um ID válido!");
                  }
                }}
                className="apagar"
              >
                Apagar
              </button>
            </div>
          </div>
        </Content>
      </Conteinner>
      <Footer />
    </>
  );
}
