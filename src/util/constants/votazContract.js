import state from "../../store/state";

state.ad = '0x0a5d906812834a2ae09ba83e071d3cdf55101151'
state.ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "candidato_scelto",
				"type": "uint256"
			}
		],
		"name": "vota_un_candidato",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "info",
		"outputs": [
			{
				"name": "votazioni_aperte",
				"type": "bool"
			},
			{
				"name": "candidati_bloccati",
				"type": "bool"
			},
			{
				"name": "risultato_visibile",
				"type": "bool"
			},
			{
				"name": "totale_voti",
				"type": "int256"
			},
			{
				"name": "numero_elettori",
				"type": "int256"
			},
			{
				"name": "numero_candidati",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nome_vincitore",
		"outputs": [
			{
				"name": "n",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "avvia_votazioni",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_elettore",
				"type": "address"
			}
		],
		"name": "assegna_diritto_di_voto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "nome_candidato_da_indice",
		"outputs": [
			{
				"name": "nomecand",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "proprietario",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidati_e_voti",
		"outputs": [
			{
				"name": "nome_candidato",
				"type": "string"
			},
			{
				"name": "conteggio_voti",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "indice_vincitore",
		"outputs": [
			{
				"name": "indice",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "info_elettore",
		"outputs": [
			{
				"name": "votato",
				"type": "bool"
			},
			{
				"name": "indice_candidato",
				"type": "uint256"
			},
			{
				"name": "autorizzato",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_candidato",
				"type": "string"
			}
		],
		"name": "aggiungi_candidato",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "chiudi_votazioni",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_status",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "cand",
				"type": "string"
			}
		],
		"name": "Success",
		"type": "event"
	}
]

export {ABI, address}
