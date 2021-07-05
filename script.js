var saw = new Vue({
  el: "#saw",
  data: {
    bobot: [
      { id: 0, name: "Kejujuran", attr: "2", poin: 35 },
      { id: 1, name: "Daya Tahan Kerja", attr: "2", poin: 25 },
      { id: 2, name: "Inisiatif", attr: "2", poin: 25 },
      { id: 3, name: "Ketelitian", attr: "2", poin: 15 },
    ],
    alter: [
      { id: 0, name: "Zain", kriteria: [80, 4, 75, 70], total: 0, rank: 0 },
      { id: 1, name: "Zian", kriteria: [80, 5, 75, 70], total: 0, rank: 0 },
      { id: 2, name: "Zafian", kriteria: [85, 4.5, 75, 75], total: 0, rank: 0 },
      { id: 3, name: "Lutfi", kriteria: [80, 3.5, 75, 70], total: 0, rank: 0 },
      { id: 4, name: "Rachel", kriteria: [85, 5, 70, 75], total: 0, rank: 0 },
    ],
    tabs: [false, false, true],
    nextBobot: 4,
    nextAlter: 5,
  },
  methods: {
    addNewBobot: function () {
      this.bobot.push({
        id: this.nextBobot++,
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
        id: this.nextAlter++,
        name: "",
        kriteria: Array(this.bobot.length).fill(""),
        total: 0,
        rank: 0,
      });
    },
    removeBobot: function (data, i) {
      data.splice(i, 1);
      if (this.alter.length !== 0) {
        this.alter.forEach(function (alt) {
          alt.kriteria.splice(i, 1);
        });
      }
    },
    checkNumber: function (i) {
      if (i === "" || i > 100 || i < 1) {
        return true;
      }
      return false;
    },
    openTabs: function (index) {
      let tab = this;
      tab.tabs.forEach(function (el, i) {
        if (index === i) {
          tab.tabs.splice(i, 1, true);
        } else {
          tab.tabs.splice(i, 1, false);
        }
      });
    },
    hitungNormal: function (bbt, altr, ix) {
      let minMax = [];
      let hasil;
      this.alter.forEach(function (el) {
        minMax.push(el.kriteria[ix]);
      });
      if (bbt == 2) {
        hasil = altr[ix] / Math.max(...minMax);
      } else if (bbt == 1) {
        hasil = Math.min(...minMax) / altr[ix];
      }
      return hasil;
    },
    hitungTotal: function (i) {
      let total = 0;
      let saw = this;
      saw.bobot.forEach(function (bbt, ix) {
        total +=
          saw.hitungNormal(bbt.attr, saw.alter[i].kriteria, ix) *
          (bbt.poin / 100);
      });
      saw.alter[i].total = total;
      return total;
    },
    getRank: function (index) {
      let arr = [];
      let saw = this;
      this.alter.forEach(function (el) {
        arr.push(el.total);
      });
      var hasil = arr.map(function (v) {
        return (
          arr
            .slice()
            .sort(function (a, b) {
              return b - a;
            })
            .indexOf(v) + 1
        );
      });
      saw.alter[index].rank = hasil[index];
      return hasil[index];
    },
    getHighestRank: function () {
      return this.alter.filter(function (y) {
        return y.rank === 1;
      })[0];
    },
  },
});
