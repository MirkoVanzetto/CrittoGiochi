# 🧩 CrittoGiochi: Wordle & Cryptography Challenge

Un'applicazione web **client-side** interattiva progettata per l'apprendimento della crittografia e della logica linguistica, ottimizzata per l'uso su dispositivi touch e **LIM (Lavagne Interattive Multimediali)**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![JS](https://img.shields.io/badge/Vanilla-JS-yellow.svg)
![Device](https://img.shields.io/badge/Optimized-Touch/LIM-orange.svg)

---

## 🎮 Modalità di Gioco

Il progetto integra due sfide logiche basate sulla manipolazione delle stringhe in lingua italiana, pensate per un target dagli 8 anni in su:

### 1. Cripto Parola (Endless Wordle)
Sfida ispirata al celebre *Wordle*, con dinamiche di gioco continuo:
* **Lunghezza Dinamica:** Parole caricate casualmente con lunghezza variabile tra **5 e 9 lettere**.
* **Grid Engine:** La griglia UI si adatta automaticamente al numero di caratteri della parola estratta.
* **Feedback Cromatico:** * 🟩 **Verde**: Lettera corretta in posizione corretta.
  * 🟨 **Giallo**: Lettera presente ma in posizione errata.
  * ⬛ **Grigio**: Lettera assente.
* **Victory Flow:** Animazione di successo (confetti/flip) e caricamento immediato del round successivo per un'esperienza "endless".

### 2. Cripto Frase (Caesar Challenge)
Un esercizio di decifrazione di intere frasi italiane basato sulla crittografia classica:
* **Cipher:** Implementazione del **Cifrario di Cesare** con chiave di spostamento $n \in [1, 25]$ generata casualmente.
* **Pattern Recognition:** Spazi e punteggiatura vengono preservati, permettendo all'utente di ragionare sulla struttura sintattica (es. articoli, congiunzioni).
* **Validation:** Sistema di verifica dell'input *case-insensitive* rispetto al plaintext originale.

---

## 🛠 Architettura Tecnica

Il software è ingegnerizzato per essere leggero, veloce e facilmente distribuibile in ambienti scolastici:

* **Zero-Backend:** L'intera logica di gioco e cifratura risiede nel client. Non è richiesto alcun database o server dinamico (Node.js/PHP).
* **Data Driven:** Il dataset (parole e frasi) è separato dalla logica applicativa e risiede in file **JSON** esterni, rendendo il gioco facilmente personalizzabile dai docenti.
* **Touch Optimization:** Utilizzo della **Pointer Events API** per eliminare la latenza di input (300ms delay) e garantire precisione su superfici touch di grandi dimensioni.
* **Layout:** Design responsive basato su CSS Grid e Flexbox per adattarsi a monitor 4:3 (tipici delle LIM) e 16:9.




## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
