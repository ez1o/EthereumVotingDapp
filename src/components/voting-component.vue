<template>
  <div class="votazCss container" v-if="isInjected">
    <h3>Votazione Decentralizzata</h3>
    <h5 v-if="this.$store.state.callprop == '0x' || !this.$store.state.callprop" id="red">
      <br>CONTRATTO NON RILEVATO
      <br>
      <br>Impostare il network corretto da Metamask</h5>
    <!-- Visualizza solo se metamask è installato (isInjected) e se esiste il 
    contratto (controllado se esiste un proprietario con callprop)  -->
    <div v-if="isInjected && this.$store.state.callprop != '0x'">
      <p v-if="this.$store.state.callinfo[0]" id="green">
        <b>Votazioni aperte</b>
      </p>
      <!-- <p>{{this.$store.state.callinfo[5]}}</p> -->
      <p v-else id="red">
        <b>Le votazioni sono chiuse</b>
      </p>
      <p v-if="fase==1">Fase 1: Le votazioni verranno aperte a breve</p>
      <p v-if="fase==2">Fase 2: I candidati non possono essere più aggiunti</p>
      <p v-if="fase==3">Fase 3: Le votazioni sono concluse</p>
      <p>Totale voti espressi: {{ parseInt(this.$store.state.callinfo[3]) }}</p>
      <p>Numero elettori autorizzati: {{ parseInt(this.$store.state.callinfo[4]) }}</p>
      <p>Numero candidati: {{ parseInt(this.$store.state.callinfo[5]) }}</p>
      <!-- TABELLA ELENCO ID DEI CANDIDATI (solo fase 2) -->
      <h5 v-if="fase==2">
        <br /> ELENCO CANDIDATI:</h5>
      <table v-if="fase==2" v-for="(data, i) in this.$store.state.callnomi" style="width: 300px; margin: auto; line-height: 0%; border: 1px solid #777">
        <tr>
          <td>
            <div style="width: 100px; text-align:right">
              <p>Candidato {{i}}:</p>
            </div>
          </td>
          <td>
            <div style="width: 180px; text-align:left">
              <p>{{data}}</p>
            </div>
          </td>
        </tr>
      </table>
      <!-- MESSAGGI A VIDEO SULL'ESITO DELLA VOTAZIONE SENZA RIMOZIONE DEI TAG HTML-->
      <h5 style="line-height=150%">
        <span v-html="this.$store.state.Votato"></span>
      </h5>
      <h5>{{nomevoto}}</h5>
      <h5 id="green" style="font-weight:900; line-height: 150%;">{{nomevoto2}}</h5>
      <!-- MESSAGGiO PENDING E GIF ANIMATA -->
      <img v-if="this.$store.state.pending" id="loader" src="../assets/pending.gif">
      <h5 v-if="this.$store.state.pending">Votazione in corso
        <br>Attendere...</h5>
      <!-- TABELLA CONTENENTE INPUT E TASTO VOTA (solo fase 2) -->
      <table v-if="fase==2">
        <tr>
          <td>
            <div class="votazCss" style="text-align:right">
              <input style="width: 100px; text-align:center" v-model="id" type="text" placeholder="Inserisci ID" id="txtName" @keyup.enter="clickVota">
            </div>
          </td>
          <td>
            <div class="votazCss" style="text-align:left">
              <button v-on:click="clickVota" class="votazCss btn btn-primary">Vota</button>
            </div>
          </td>
        </tr>
      </table>
      <!-- TABELLA FASE 3 (RISULTATI DELLE VOTAZIONI) -->
      <h5 v-if="fase==3">
        <br> RISULTATO DEFINITIVO:</h5>
      <table v-if="fase==3" v-for="(nomievoti) in this.$store.state.callvoti" style="width: 300px; margin: auto; line-height: 0%; border: 1px solid #777">
        <tr>
          <td>
            <div style="width: 280px; text-align:center">
              <p>{{nomievoti}}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <br />
    <br />
    <br />
    <br />
    <p align="center" style="font-size:80%">
      <i>Ezio Coriglione - © 2018 - Uninettuno University </i>
    </p>
    <br />
  </div>
</template>
// *********************************************************************************************
<script>
  /* eslint-disable */
  //import {mapState} from 'vuex'

  export default {
    name: "voting-component",
    data() {
      return {
        amount: null,
        winEvent: null,
        id: null,
        nomevoto: null,
        nomevoto2: null
      };
    },
    computed: {
      fase: function () {
        var fase = 0;
        if (!this.$store.state.callinfo[0] && !this.$store.state.callinfo[1]) {
          fase = 1;
        } else if (this.$store.state.callinfo[0]) {
          fase = 2;
        } else if (!this.$store.state.callinfo[0] &&
          this.$store.state.callinfo[1]
        ) {
          fase = 3;
        }
        //fase = 2
        return fase;
      },
      isInjected: function () {
        return this.$store.state.web3.isInjected;
      },
      // contratto assente all'indirizzo specificato?
    },
    methods: {
      updateInvioAddr(event) {
        console.log("Lettura dati");
        this.winEvent = null;
        this.$store.state.pending = true;
        this.$store.state.contractInstance().info({
            gas: 300000,
            value: this.$store.state.web3
              .web3Instance()
              .toWei(this.amount, "ether"),
            from: this.$store.state.web3.coinbase
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("non errato: ", result);
              var evento = this.$store.state.contractInstance;
            }
          }
        );
      },
      updateTastoAggiorna(event) {
        console.log("TASTONE PREMUTOOOO: ", VotingComponent.id);
        // address = this.address
      },
      updateTastoInvio(event) {
        this.$store.dispatch("getContractInstance");
        console.log("TASTO INVIO: ", this.id);
        var getContract = new Promise(function (resolve, reject) {
          // var web3 = new Web3(window.web3.currentProvider)
          var votazContract = web3.eth.contract(state.ABI);
          var votazContractInstance = votazContract.at(this.id);
          console.log(votazContractInstance);
          resolve(votazContractInstance);
        });
        this.$store.dispatch("getContractInstance");
      },
      clickVota(event) {
        this.$store.dispatch("getRead");
        console.log("dispatching getContractInstance");
        this.$store.state.Votato = null;
        this.nomevoto = null;
        // se si lascia in bianco non continua,
        // lasciare in bianco sarebbe uguale al candidato 0
        if (this.id == null) {
          this.nomevoto = "ID non valido. Non hai digitato nulla.";
          console.log("annullato");
          return;
        }
        // se non si inserisce un numero non continua
        if (isNaN(parseInt(this.id))) {
          this.nomevoto = "ID non valido. Non hai inserito un numero.";
          console.log("annullato");

          return;
        }

        this.winEvent = null;
        this.$store.state.pending = true;
        this.$store.state.votoclick = true;
        this.$store.state.contractInstance().vota_un_candidato(
          parseInt(this.id), {
            gas: 300000,
            value: this.$store.state.web3
              .web3Instance()
              .toWei(this.amount, "ether"),
            from: this.$store.state.web3.coinbase
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let evento = this.$store.state.contractInstance().Success();
              evento.watch((err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  // cancella la scritta "Nessun voto è stato espresso" nella scritta Votato
                  this.$store.state.Votato = "";
                  this.winEvent = result.args;
                  console.log("Status: ", this.winEvent._status);
                  console.log("Nome Candidato: ", this.winEvent.cand);
                  this.$store.state.pending = false;
                  this.$store.state.votook = true;
                  this.nomevoto =
                    "La transazione è conclusa. Il voto è stato registrato sulla blockchain ";
                  this.nomevoto2 =
                    "Hai votato per: " + unescape(this.winEvent.cand);
                  state.id = "";
                }
              });
            }
          }
        );
      }
    },
    mounted() {
      console.log('VALORE: ', this.nocontr);
      console.log("dispatching getContractInstance");
      // istanzia il contratto nelle variabili
      this.$store.dispatch("getContractInstance");
      // legge i dati del contratto
      this.$store.dispatch("getRead");
    }
  };
  //  export {address}

</script>

<style scoped>
  .votazCss {
    text-align: center;
    line-height: 70%;
  }

  #green {
    color: green;
  }

  #red {
    color: red;
  }

  /*#loader {
  width:150px;
}*/

  /*ul {
    margin: 25px;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap:25px;
    grid-row-gap:25px;
}
li{
    padding: 20px;
    margin-right: 5px;
    border-radius: 50%;
    cursor: pointer;
    background-color:#fff;
    border: -2px solid #bf0d9b;
    color: #bf0d9b;
    box-shadow:3px 5px #bf0d9b;
}
li:hover{
    background-color:#bf0d9b;
    color:white;
    box-shadow:0px 0px #bf0d9b;
}
li:active{
    opacity: 0.7;
}
*{
   color: #444444;
}
#has-won {
  color: green;
}
#has-lost {
  color:red;
}*/

</style>
