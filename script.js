new Vue({
  el: "#saw",
  data: {
    bobot: [],
    alter: [],
    tabs: [true, false, false],
    print: false,
    loader: true,
  },
  computed: {
    dataEmpty: function () {
      return !this.bobot.length ? true : !this.alter.length ? true : false;
    },
  },
  mounted: function () {
    setTimeout(
      function () {
        this.loader = false;
      }.bind(this),
      1000
    );
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
      if (this.alter.length === 0 || this.bobot.length === 0) {
        return 0.0;
      } else {
        let minMax = [];
        this.alter.forEach(function (el) {
          minMax.push(el.kriteria[ix]);
        });
        return bbt == 2
          ? (altr[ix] / Math.max(...minMax)).toFixed(2)
          : bbt == 1
          ? (Math.min(...minMax) / altr[ix]).toFixed(2)
          : false;
      }
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
      if (this.alter.length === 0 || this.bobot.length === 0) {
        return 0;
      } else {
        let rank = Array();
        rank.push(
          this.alter.filter(function (y) {
            return y.rank === 1;
          })[0]
        );
        rank.push(
          this.alter
            .map(function (e) {
              return e.rank;
            })
            .indexOf(1) + 1
        );
        return rank;
      }
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
Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;
Vue.config.productionTip = false;
