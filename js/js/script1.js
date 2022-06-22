class Produto{
    constructor(){
        this.id = 1;
        this.arreyProdutos = [];
        this.editId = null; 
    }

    salvar(){
        let produto = this.lerDados();

        if(this.validaCampos(produto) == true){
            if(this.editId == null){
                this.adicionar(produto);
            }
           else{
               this.atualizar(this.editId, produto);
           }
        }
        this.listaTabela();
        this.limpar();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arreyProdutos.length; i++){
            let tr  =  tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arreyProdutos[i].id;
            td_produto.innerText = this.arreyProdutos[i].nomeProduto;
            td_valor.innerText = this.arreyProdutos[i].valor;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.png';
            imgEdit.setAttribute("onclick","produto.edicao("+ JSON.stringify(this.arreyProdutos[i]) +")");
            

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delete.png';
            imgDelete.setAttribute("onclick","produto.deletar("+ this.arreyProdutos[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            console.log(this.arreyProdutos);
            
        }
    }

    adicionar(produto){
        produto.valor = parseFloat(produto.valor).toFixed(2);
        this.arreyProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto){
        for (let i = 0; i < this.arreyProdutos.length; i++) {
            if(this.arreyProdutos[i].id == id){
                this.arreyProdutos[i].nomeProduto = produto.nomeProduto;
                this.arreyProdutos[i].valor = produto.valor;
            }
            
        }
    }

    edicao(dados){
        this.editId = dados.id;
        
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valor;

        document.getElementById('btn').innerText = 'Atualizar';
    }

    lerDados(){
        let produto = {}
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.valor = document.getElementById('valor').value;
        return produto;
    }

    validaCampos(produto){
        let msg = '';

        if(produto.nomeProduto == ''){
            msg  += 'Informe o nome do produto \n';
        }

        if(produto.valor == ''){
            msg  += 'Informe o valor \n';
        }

        if(msg != ''){
            alert(msg);
            return false
        }

        return true;
    }

    limpar(){
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';

        document.getElementById('btn').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id){

        if(confirm('Deseja realmente deletar o produto '  + id)){

        

        let tbody = document.getElementById('tbody');
        

        for(let i = 0; i < this.arreyProdutos.length; i++){
            if(this.arreyProdutos[i].id == id){
                this.arreyProdutos.splice(i, 1);
                let tr = tbody.deleteRow(i);
            }
        }
        console.log(this.arreyProdutos);
        }
    }

}

var produto = new Produto();