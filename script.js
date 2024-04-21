
// Chiamare la funzione per caricare e analizzare il file CSV al caricamento dell'app
loadCSVFile();

// Funzione per mostrare la lista delle monete
function showCoinList(category, subCategory) {
    var coinList = document.getElementById('coinList');
    coinList.innerHTML = ''; // Svuota la lista delle monete

    // Simulazione di un elenco di monete per la sottocategoria selezionata
    var coins = getCoinsByCategoryAndSubCategory(category, subCategory);

    // Aggiungi un titolo per la sottocategoria
    var subTitle = document.createElement('h2');
    subTitle.textContent = subCategory;
    coinList.appendChild(subTitle);

    // Per ogni moneta nella lista, crea un elemento moneta
    coins.forEach(function(coin, index) {
        var coinContainer = document.createElement('div'); // Creiamo un contenitore per ogni moneta
        var coinElement = createCoinElement(coin, false);
        coinContainer.appendChild(coinElement); // Aggiungi l'elemento moneta al contenitore

        // Aggiungi il nome della moneta sopra il campo "Inserisci prezzo"
        var coinName = document.createElement('span');
        coinName.textContent = coin.name;
        coinName.classList.add('coin-name');
        coinContainer.insertBefore(coinName, coinElement);

        coinList.appendChild(coinContainer); // Aggiungiamo il contenitore alla lista delle monete
    });

    // Mostra la lista delle monete
    coinList.classList.remove('hidden');
}

// Funzione di esempio per ottenere le monete in base alla categoria e alla sottocategoria selezionate
function getCoinsByCategoryAndSubCategory(category, subCategory) {
    // Implementa la logica per ottenere le monete in base alla categoria e alla sottocategoria selezionate
    // Esempio di implementazione per alcune categorie e sottocategorie specifiche
    var coins = [];
    if (category === 'regnoItalia' && subCategory === '1 Lira') {
        coins = [
            { name: 'Moneta 1', image: 'images/coin1.jpg', quantity: 1 },
            { name: 'Moneta 2', image: 'images/coin2.jpg', quantity: 1 },
            { name: 'Moneta 3', image: 'images/coin3.jpg', quantity: 1 }
        ];
    } else if (category === 'repubblicaItaliana' && subCategory === '10 Lire') {
        coins = [
            { name: 'Moneta A', image: 'images/coinA.jpg', quantity: 1 },
            { name: 'Moneta B', image: 'images/coinB.jpg', quantity: 1 },
            { name: 'Moneta C', image: 'images/coinC.jpg', quantity: 1 }
        ];
    } else if (category === 'moneteArgento' && subCategory === 'Argento 1') {
        coins = [
            { name: 'Moneta X', image: 'images/coinX.jpg', quantity: 1 },
            { name: 'Moneta Y', image: 'images/coinY.jpg', quantity: 1 },
            { name: 'Moneta Z', image: 'images/coinZ.jpg', quantity: 1 }
        ];
    } else if (category === 'moneteOro' && subCategory === 'Oro 1') {
        coins = [
            { name: 'Moneta P', image: 'images/coinP.jpg', quantity: 1 },
            { name: 'Moneta Q', image: 'images/coinQ.jpg', quantity: 1 },
            { name: 'Moneta R', image: 'images/coinR.jpg', quantity: 1 }
        ];
    }

    return coins;
}

// Definiamo le sotto-categorie per ogni categoria
var subCategories = {
    regnoItalia: ['1 Lira', '2 Lire', '5 Lire'],
    repubblicaItaliana: ['10 Lire', '20 Lire', '50 Lire'],
    moneteArgento: ['Argento 1', 'Argento 2', 'Argento 3'],
    moneteOro: ['Oro 1', 'Oro 2', 'Oro 3']
};

// Aggiungiamo eventi click per le sotto-categorie
Object.keys(subCategories).forEach(function(category) {
    var categoryButton = document.getElementById(category);
    categoryButton.addEventListener('click', function() {
        showSubCategories(category);
    });
});

// Funzione per mostrare le sotto-categorie
function showSubCategories(category) {
    var subCategoryList = document.getElementById('subCategoryList');
    subCategoryList.innerHTML = ''; // Svuota la lista delle sotto-categorie

    // Ottieni le sotto-categorie per la categoria selezionata
    var subCategoriesForCategory = subCategories[category];

    // Per ogni sotto-categoria, crea un pulsante e aggiungi un evento click
    subCategoriesForCategory.forEach(function(subCategory) {
        var subCategoryButton = document.createElement('button');
        subCategoryButton.textContent = subCategory;
        subCategoryButton.addEventListener('click', function() {
            showCoinList(category, subCategory); // Mostra la lista delle monete per la sotto-categoria selezionata
        });
        subCategoryList.appendChild(subCategoryButton); // Aggiungi il pulsante alla lista delle sotto-categorie
    });

    subCategoryList.classList.remove('hidden'); // Mostra la lista delle sotto-categorie
}

// Funzione per creare un elemento moneta
function createCoinElement(coin, isDuplicate) {
    var coinElement = document.createElement('div');
    coinElement.classList.add('coin');

    // Aggiungi il primo campo immagine della moneta con il testo "A"
    var imageElement1 = createImageInput(coin);
    coinElement.appendChild(imageElement1);

    // Aggiungi il secondo campo immagine della moneta con il testo "B"
    var imageElement2 = createImageInput(coin);
    coinElement.appendChild(imageElement2);

    // Aggiungi il nome della moneta sopra il campo "Inserisci prezzo"
    var coinName = document.createElement('span');
    coinName.textContent = coin.name;
    coinName.classList.add('coin-name');
    coinElement.appendChild(coinName);

    // Aggiungi il campo prezzo
    var priceElement = document.createElement('input');
    priceElement.type = 'text';
    priceElement.placeholder = 'Inserisci il prezzo';
    coinElement.appendChild(priceElement);

    // Aggiungi il campo stato di conservazione
    var conditionElement = document.createElement('input');
    conditionElement.type = 'text';
    conditionElement.placeholder = 'Stato di conservazione (es. QFDC)';
    coinElement.appendChild(conditionElement);

    // Aggiungi il menu a discesa per selezionare il numero di monete possedute
    var quantitySelect = document.createElement('select');
    for (var i = 1; i <= 100; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        quantitySelect.appendChild(option);
    }
    quantitySelect.addEventListener('change', function() {
        var selectedQuantity = parseInt(quantitySelect.value);
        if (selectedQuantity > 1) {
            for (var j = 1; j < selectedQuantity; j++) {
                var duplicateCoin = createCoinElement(coin, true);
                coinElement.parentNode.insertBefore(duplicateCoin, coinElement.nextSibling);
            }
        }
    });
    coinElement.appendChild(quantitySelect);

    // Aggiungi il pulsante "Elimina" solo se l'elemento è un duplicato
    if (isDuplicate) {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Elimina';
        deleteButton.addEventListener('click', function() {
            coinElement.remove(); // Rimuovi l'elemento moneta quando viene cliccato il pulsante "Elimina"
        });
        coinElement.appendChild(deleteButton);
    }

    return coinElement;
}




// Funzione per creare un campo immagine della moneta
function createImageInput(coin) {
    var imageElement = document.createElement('img');
    imageElement.alt = coin.name;
    imageElement.src = coin.image || 'default_coin_image.jpg'; // Se non è specificata un'immagine, usa l'immagine predefinita
    imageElement.addEventListener('click', function() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                loadImageFromFile(this.files[0], function(img) {
                    imageElement.src = img.src;
                });
            }
        });
        input.click();
    });

    return imageElement;
}



// Funzione per caricare un'immagine da un file e eseguire una callback una volta caricata
function loadImageFromFile(file, callback) {
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = new Image();
            img.onload = function() {
                callback(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Percorso del file CSV all'interno della cartella dell'applicazione
var csvFilePath = 'Monet/database.csv'; // Modifica il percorso del file CSV in base alla tua struttura di cartelle

// Funzione per analizzare i dati del file CSV
function processData(csvData) {
    try {
        var lines = csvData.split('\n');
        var coins = [];

        // Itera su ogni riga del file CSV
        for (var i = 1; i < lines.length; i++) { // Parti da 1 per saltare l'intestazione
            var line = lines[i].trim(); // Rimuovi spazi vuoti da inizio e fine riga
            if (line !== '') { // Ignora righe vuote
                var values = line.split(','); // Dividi la riga in array di valori utilizzando la virgola come separatore
                var coin = {
                    name: values[0].trim(), // Assicurati che i valori siano privi di spazi vuoti
                    category: values[1].trim(),
                    subCategory: values[2].trim(),
                    regnante: values[3] ? values[3].trim() : '', // Gestisci il caso in cui non sia presente un valore
                    peso: values[4] ? parseFloat(values[4].trim()) : 0 // Gestisci il caso in cui non sia presente un valore o sia una stringa vuota
                };
                coins.push(coin); // Aggiungi l'oggetto moneta all'array delle monete

                // Aggiungi questo console.log() per vedere i dati estratti da ogni riga del CSV
                console.log('Dati estratti:', coin);
            }
        }

        // Aggiungi questo console.log() per vedere l'array completo delle monete
        console.log('Array completo delle monete:', coins);

        // Ora puoi utilizzare l'array 'coins' contenente tutte le monete per mostrare o elaborare i dati nell'app

    } catch (error) {
        console.error('Errore durante l\'analisi dei dati del file CSV:', error);
    }
}



// Funzione per caricare e analizzare il file CSV
function loadCSVFile() {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv'; // Accetta solo file CSV
    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0]; // Ottieni il file selezionato
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var csvData = e.target.result;
                processData(csvData); // Funzione per analizzare i dati del file CSV
            };
            reader.readAsText(file); // Leggi il contenuto del file come testo
        }
    });

    fileInput.click(); // Simula il clic sull'input di tipo file per aprire la finestra di dialogo
}

// Funzione per gestire il click sul pulsante "Scarica Catalogo"
document.getElementById('downloadButton').addEventListener('click', function() {
    // Crea un link virtuale per il download del file CSV
    var link = document.createElement('a');
    link.href = 'monet/database.csv'; // Assicurati che il percorso sia corretto
    link.download = 'database.csv'; // Specifica il nome del file da scaricare
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});



