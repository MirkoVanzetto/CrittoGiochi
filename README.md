<div align="center">
🧩 CrittoGiochi: Wordle & Cryptography ChallengeUn'applicazione web client-side interattiva progettata per l'apprendimento della crittografia e della logica linguistica, ottimizzata per il touch e le LIM (Lavagne Interattive Multimediali).🎮 Modalità di GiocoIl progetto integra due diverse sfide logiche basate sulla manipolazione delle stringhe in lingua italiana:1. Cripto Parola (Endless Wordle)Sfida ispirata al celebre Wordle, ma con una marcia in più:Lunghezza Dinamica: Parole caricate casualmente con lunghezza variabile tra 5 e 9 lettere.Grid Engine: La griglia UI si adatta dinamicamente al numero di caratteri della parola estratta.Feedback Cromatico: * 🟩 Verde: Lettera corretta in posizione corretta.🟨 Giallo: Lettera presente ma in posizione errata.⬛ Grigio: Lettera assente.Victory Flow: Animazione di successo al termine di ogni parola e caricamento immediato del round successivo.2. Cripto Frase (Caesar Cipher)Un esercizio di decifrazione di intere frasi italiane:Cipher: Implementazione del Cifrario di Cesare con chiave di spostamento $n \in [1, 25]$ generata casualmente per ogni sessione.Persistence: Spazi e punteggiatura vengono preservati per mantenere il pattern sintattico della frase originale.Validation: Confronto case-insensitive tra l'input utente e il plaintext originale.🛠 Architettura TecnicaEssendo un progetto focalizzato sulla portabilità e la facilità di deployment in ambito scolastico, l'architettura segue questi pilastri:Zero-Backend: L'intera logica risiede nel client. Non è richiesto alcun database o server dinamico.Data Driven: Il dataset (parole e frasi) è disaccoppiato dal codice sorgente ed è contenuto in file JSON esterni, facilitando l'aggiornamento dei contenuti.Touch Optimization: Utilizzo della Pointer Events API per eliminare la latenza di input su dispositivi touch e garantire compatibilità con i sistemi di puntamento delle LIM.Asset Management: Gestione dei font e dei colori tramite variabili CSS per garantire un tema coerente e accessibile.
</div>


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
