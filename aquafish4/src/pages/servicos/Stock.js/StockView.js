
import { useEffect, useState } from "react";

import Header from "../../../components/Header";
import Conteinner from "../../../components/Conteinner";
import Slider from "../../../components/Slider";
import Content from "../../../components/Content";

import { useNavigate } from "react-router-dom";
import Modal from "../../../components/modal";
import modal from "../../../components/modal";
import mensagem from "../../../components/mensagem";
import Footer from "../../../components/Footer";
import repositorioStock from "./Repositorio";

export default function StockView() {
  const repositorio = new repositorioStock();
  const [modelo, setModelo] = useState([]);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState(""); // Estado para o ID digitado
  const navigate = useNavigate();
  let     moda= new modal();
  let     msg= new mensagem();
  
  useEffect(()=>{
   
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
                  <th>Quanidade</th>
                  <th>Tipo</th>
                  <th>Mercadoria</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {modelo.map((elemento, i) => (
                  <tr key={i}>
                    <td>{elemento.idstock}</td>
                    <td>{elemento.quantidade}</td>
                    <td>{elemento.tipo}</td>
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
                        moda.Abrir("deseja editar o "+id)
                         document.querySelector(".sim").addEventListener("click",()=>{
                            navigate(`/registar-stock/${id}`)
                          })
                         document.querySelector(".nao").addEventListener("click",()=>{
                           moda.fechar()
                          })
                      } else {
                        msg.Erro("Por favor, digite um ID válido!");
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
              onClick={()=>{
                if (id) {
                    moda.Abrir("deseja apagar o "+id)
                     document.querySelector(".sim").addEventListener("click",()=>{
                    repositorio.deletar(id)
                    moda.fechar()
                      })
                     document.querySelector(".nao").addEventListener("click",()=>{
                       moda.fechar()
                      })
                  } else {
                    msg.Erro("Por favor, digite um ID válido!");
                  }
              
              }}
                 className="apagar">Apagar</button>
            
            </div>
          </div>
        </Content>
      </Conteinner>
      <Footer></Footer>
    </>
  );
}
