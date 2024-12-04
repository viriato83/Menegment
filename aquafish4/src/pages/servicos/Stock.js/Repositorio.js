import mensagem from "../../../components/mensagem";



export default class repositorioStock{


    constructor(){
        this.endpoint ="http://localhost:8080/aquafish/stock"
        this.mensagem= new mensagem()
        this.token=sessionStorage.getItem("token");
  
    }
    async cadastrar(stock) {
        try {
          let res = await fetch(this.endpoint, {  // Adicione 'await'
            method:"POST",
            body: JSON.stringify(stock),
            headers: {
              "Authorization":  `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          });
    
          if (res.ok) {  // Use 'res.ok' em vez de 'res.status == 200'
            console.log("Cadastro feito com sucesso");
            this.mensagem.sucesso("cadastro feito com sucesso")

            //  return true;
          } else {
            console.log("Erro ao cadastrar:", res.status);
            this.mensagem.Erro("Ocorreu um erro ao cadastar  " + res.status)
            // return false;
          }
        } catch (e) {
          console.error("Erro no cadastro:", e);
   
        }
      }
    
      async  leitura() {
        try {
          const res = await fetch(this.endpoint, {  // Adicione 'await' e utilize o this.endpoint
            method: 'GET',
            
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          });
    
          if (res.status== 200) {
            const data = await res.json();
                    
    
            console.log('Dados recebidos:', data);
            return data;
          } else {
            console.log('Erro ao fazer a leitura:', res.status);
            this.mensagem.Erro("Erro ao fazer a leitura")
            return [];
          }
        } catch (err) {
          console.error('Erro ao fazer a leitura:', err);
          return [];
        }
      } 
      async buscarMercadoria(){
        try {
            const res = await fetch("http://localhost:8080/aquafish/mercadoria", {  // Adicione 'await' e utilize o this.endpoint
              method: 'GET',
              
              headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
              }
            });
      
            if (res.status== 200) {
              const data = await res.json();
                      
      
              console.log('Dados recebidos:', data);
              return data;
            } else {
              console.log('Erro ao fazer a leitura:', res.status);
             
              return [];
            }
          } catch (err) {
            console.error('Erro ao fazer a leitura:', err);
            return [];
          }
            
      }
    
    
    
    
      async editar(Id, cliente) {
        try {
          let res = await fetch(this.endpoint, {  // Adicione 'await' e corrija o endpoint
            method: "PUT", 
            headers: {
              "Authorization": "Bearer " + this.token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: Id ,...cliente}) 
           
          });
          console.log(JSON.stringify({ id: Id ,...cliente}))
    
          if (res.status==200) {
            console.log("Editado com sucesso"); 
            this.mensagem.sucesso("Editado com sucesso");  
            return true;
          } else {
            console.log("Erro ao editar:", res.status);
            this.mensagem.Erro("Erro ao editar");
            return false;
          }
        } catch (e) {
          console.error("Erro ao editar:", e);
          return false;
        }
      }
    
      async deletar(Id) {  // Renomeado de 'editar' para 'deletar'
        try {
          let res = await fetch(this.endpoint, {  // Adicione 'await' e corrija o endpoint
            method: "DELETE",
            headers: {
              "Authorization": "Bearer " + this.token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: Id }) 
          });
    
          if (res.status==200) {
            console.log("Deletado com sucesso");
            this.mensagem.sucesso("Deletado com sucesso"); 
            window.location.reload()
            return true;
          } else {
            console.log("Erro ao deletar:", res.status);
            this.mensagem.Erro("Erro ao deletar"); 
            return false;
          }
        } catch (e) {
          console.error("Erro ao deletar:", e);
          return false;
        }
      }
    
      async total() {  // Renomeado de 'editar' para 'deletar'
        try {
          let res = await fetch(this.endpoint+"/total", {  // Adicione 'await' e corrija o endpoint
            method: "GET",
            headers: {
              "Authorization": "Bearer " + this.token,
              'Content-Type': 'application/json'
            }
          });
    
          if (res.status==200) {
           let data= await res.json()
            return data;
          } else {
            console.log("Erro ao total:", res.status);
            return false;
          }
        } catch (e) {
          console.error("Erro ao total:", e);
          return false;
        }
      }




}