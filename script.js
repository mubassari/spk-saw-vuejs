new Vue({
  el: "#saw",
  data: {
    bobot: [
      { name: "Kejujuran", attr: "2", poin: 35 },
      { name: "Daya Tahan Kerja", attr: "2", poin: 25 },
      { name: "Inisiatif", attr: "2", poin: 25 },
      { name: "Ketelitian", attr: "2", poin: 15 },
    ],
    alter: [
      { name: "Zain", kriteria: [80, 4, 75, 70], total: 0, rank: 0 },
      { name: "Zian", kriteria: [80, 5, 75, 70], total: 0, rank: 0 },
      { name: "Zafian", kriteria: [85, 4.5, 75, 75], total: 0, rank: 0 },
      { name: "Lutfi", kriteria: [80, 3.5, 75, 70], total: 0, rank: 0 },
      { name: "Rachel", kriteria: [85, 5, 70, 75], total: 0, rank: 0 },
    ],
    tabs: [false, false, true],
    print: false,
  },
  methods: {
    addNewBobot: function () {
      this.bobot.push({
        name: "",
        attr: 0,
        poin: "",
      });
      if (this.alter.length !== 0) {
        this.alter.forEach(function (alt) {
          alt.kriteria.push("");
        });
      }
    },
    addNewAlter: function () {
      this.alter.push({
        name: "",
        kriteria: Array(this.bobot.length).fill(""),
        total: 0,
        rank: 0,
      });
    },
    removeBobot: function (i) {
      this.bobot.splice(i, 1);
      if (this.alter.length !== 0) {
        this.alter.forEach(function (alt) {
          alt.kriteria.splice(i, 1);
        });
      }
    },
    checkNumber: function (i) {
      return i === "" || i > 100 || i < 1 ? true : false;
    },
    openTabs: function (index) {
      let saw = this;
      saw.tabs.forEach(function (el, i) {
        saw.tabs.splice(i, 1, index === i ? true : false);
      });
    },
    hitungNormal: function (bbt, altr, ix) {
      let minMax = [];
      this.alter.forEach(function (el) {
        minMax.push(el.kriteria[ix]);
      });
      return bbt == 2
        ? altr[ix] / Math.max(...minMax)
        : bbt == 1
        ? Math.min(...minMax) / altr[ix]
        : false;
    },
    hitungTotal: function (i) {
      let total = 0;
      let saw = this;
      this.bobot.forEach(function (bbt, ix) {
        total +=
          saw.hitungNormal(bbt.attr, saw.alter[i].kriteria, ix) *
          (bbt.poin / 100);
      });
      this.alter[i].total = total;
      return total;
    },
    getRank: function (index) {
      let arr = [];
      this.alter.forEach(function (el) {
        arr.push(el.total);
      });
      let hasil = arr.map(function (v) {
        return (
          arr
            .slice()
            .sort(function (a, b) {
              return b - a;
            })
            .indexOf(v) + 1
        );
      });
      this.alter[index].rank = hasil[index];
      return hasil[index];
    },
    getHighestRank: function () {
      return this.alter.filter(function (y) {
        return y.rank === 1;
      })[0];
    },
    printData: function () {
      this.print = true;
      window.onafterprint = (e) => (this.print = false);
      setTimeout(function () {
        window.print();
      }, 50);
    },
  },
});
