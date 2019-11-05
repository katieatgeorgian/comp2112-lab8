new Vue({
  el: "#app",
  data: {
    money: [
      { level: "15", amount: "1,000,000" },
      { level: "14", amount: "500,000" },
      { level: "13", amount: "250,000" },
      { level: "12", amount: "100,000" },
      { level: "11", amount: "50,000" },
      { level: "10", amount: "25,000" },
      { level: "9", amount: "16,000" },
      { level: "8", amount: "8,000" },
      { level: "7", amount: "4,000" },
      { level: "6", amount: "2,000" },
      { level: "5", amount: "1,000" },
      { level: "4", amount: "500" },
      { level: "3", amount: "300" },
      { level: "2", amount: "200" },
      { level: "1", amount: "100" }
    ],
    triviaBlocks: [],
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    music: new Audio("./js/Round1.ogg"),
    host: new SpeechSynthesisUtterance(),
    selected: undefined
  },
  methods: {
    async startGame() {
      this.selected = true;
      let choices = [];
      this.playRound1();

      const res = await fetch(
        "https://opentdb.com/api.php?amount=15&type=multiple"
      );
      const data = await res.json();
      this.triviaBlocks = data.results;
      console.log(this.triviaBlocks);
      this.question = this.triviaBlocks[0].question;
      console.log(this.question);
      //note: when I did line below without pushing each individually it seemed to affect the incorrect answers in the triviaBlocks
      // choices = this.triviaBlocks[0].incorrect_answers;
      choices.push(this.triviaBlocks[0].incorrect_answers[0]);
      choices.push(this.triviaBlocks[0].incorrect_answers[1]);
      choices.push(this.triviaBlocks[0].incorrect_answers[2]);
      choices.push(this.triviaBlocks[0].correct_answer);

      const randomChoices = _.shuffle(choices);
      console.log(randomChoices);

      this.answer1 = randomChoices[0];
      this.answer2 = randomChoices[1];
      this.answer3 = randomChoices[2];
      this.answer4 = randomChoices[3];
      this.read();
    },
    playRound1() {
      this.music.play();
    },
    read() {
      this.host.rate = 0.6;
      this.host.text = `${this.question}, A, ${this.answer1}, B, ${this.answer2}, C, ${this.answer3}, D, ${this.answer4}`;
      speechSynthesis.speak(this.host);
    }
  }
});
