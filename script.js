document.addEventListener("mousemove", function (x) {
  gsap.to(".crsr", {
    left: x.x + 8,
    top: x.y + 10,
    opacity: 1,
  });

  gsap.to(".blur-cursor", {
    left: x.x - 125,
    top: x.y - 125,
  });
});
//generate random color
function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  // console.log(letters);
  return color;
}
//Change Hearts Color
const heartsColorChange = setInterval(() => {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  gsap.to(".crsr", {
    color: getRandomColor(),
  });
}, 1000);
// on click function other expenditure
const otherExpenditure = document.querySelector(".oeonclick");
const expendituresheet = document.querySelector(".other-expenditure");
otherExpenditure.addEventListener("click", () => {
  expendituresheet.classList.toggle("show-expenditure");
  otherExpenditure.classList.toggle("background-active");
});

// logic for search ========================>>>>>>>>

const searchInput = document.getElementById("search-expenditure");
const searchResults = document.querySelector(".search-results");
const contentDiv = document.querySelector(".oe-items");

function performSearch() {
  const searchQuery = searchInput.value.toLocaleLowerCase();
  const searchItems = contentDiv.querySelectorAll("a");

  let matchingParagraphs = [];

  searchItems.forEach((item) => {
    const text = item.textContent.toLocaleLowerCase();
    if (text.includes(searchQuery)) {
      matchingParagraphs.push(item);
    }
  });
  //display search results ===>>>
  displaySearchResults(matchingParagraphs);
}

function displaySearchResults(results) {
  searchResults.innerHTML = "";
  if (results.length == 0) {
    searchResults.innerHTML = "no record found";
  } else {
    results.forEach((result) => {
      searchResults.appendChild(result);
    });
  }
}
searchInput.addEventListener("input", performSearch);

//Al Hifza Schedule
//inputs
const sqyInput = document.getElementById("sqy");
const chargesCountInput = document.getElementById("charges-count");
const paidInput = document.getElementById("paid");
const cusInstallInput = document.querySelector("#install-input");
const makeRound = document.querySelector("#make-round");
//outputs
const costOutput = document.getElementById("cost");
const discountOutput = document.getElementById("discount");
const chargesOutput = document.getElementById("charges");
const finalCostOutput = document.getElementById("final-cost");
const installmentsOutput = document.getElementById("install");
const remainder = document.getElementById("remainder");
const lastInstallment = document.getElementById("last-install");

// <<<=========== master Function ===========>>>
function mainFunction() {
  //cost Output
  costOutput.textContent = ((3500000 / 120) * Number(sqyInput.value)).toFixed(
    0
  );
  //Discount Output
  Number(sqyInput.value) >= 120
    ? (discountOutput.textContent = 500000)
    : (discountOutput.textContent = (
        (500000 / 120) *
        Number(sqyInput.value)
      ).toFixed(0));
  //charges Output
  chargesOutput.textContent = (
    Number(costOutput.textContent) *
    0.05 *
    Number(chargesCountInput.value)
  ).toFixed(0);
  // finalCost Output
  finalCostOutput.textContent = (
    Number(costOutput.textContent) -
    Number(discountOutput.textContent) +
    Number(chargesOutput.textContent)
  ).toFixed(0);
  // Installment Output
  if (Number(cusInstallInput.value) > 0) {
    installmentsOutput.textContent = (
      (Number(finalCostOutput.innerText) - Number(paidInput.value)) /
      Number(cusInstallInput.value)
    ).toFixed(0);
  } else {
    installmentsOutput.textContent = (
      (Number(finalCostOutput.innerText) - Number(paidInput.value)) /
      16
    ).toFixed(0);
  }
  if (Number(makeRound.value) > 0) {
    remainder.textContent =
      Number(installmentsOutput.textContent) % Number(makeRound.value);
  } else {
    remainder.textContent = 0;
  }

  //last installment output
  if (Number(cusInstallInput.value) > 0) {
    lastInstallment.textContent =
      Number(cusInstallInput.value) * Number(remainder.textContent);
  } else {
    lastInstallment.textContent = 16 * Number(remainder.textContent);
  }
}

//<<<========== sqy listener Function ==========>>>
sqyInput.addEventListener("change", () => {
  mainFunction();
});

//<<<====== chargescount listener Function =====>>>
chargesCountInput.addEventListener("change", () => {
  mainFunction();
});
//<<<====== paid listener Function =====>>>

paidInput.addEventListener("change", () => {
  mainFunction();
});
//<<<====== cusInstall listener Function =====>>>
cusInstallInput.addEventListener("change", () => {
  mainFunction();
});
//<<<====== Make Round listener Function =====>>>
makeRound.addEventListener("change", () => {
  mainFunction();
  installmentsOutput.textContent =
    Number(installmentsOutput.textContent) - Number(remainder.textContent);
});

//schedule class toggle
const scheduleClick = document.querySelector("#clickSchedule");
const scheduleDiv = document.querySelector(".main");

scheduleClick.addEventListener("click", () => {
  scheduleDiv.classList.toggle("main2");
  scheduleClick.classList.toggle("active-tb");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    scheduleDiv.classList.remove("main2");
    scheduleClick.classList.remove("active-tb");
    expendituresheet.classList.remove("show-expenditure");
    otherExpenditure.classList.remove("background-active");
  }
});
//onLoad
document.body.className = "hidden-header";
document.body.className = "appear";

document.querySelector(".header").className = "hidden-header";
setTimeout(() => {
  document.querySelector(".hidden-header").className = "header";
}, 500);

//block El Enter onload
const blockEl = document.querySelectorAll(".blocka");
let index = 0;
function showNextEl() {
  if (index < blockEl.length) {
    blockEl[index].className = "blocka-appear";
    index++;
  } else {
    clearInterval(blockInterval);
  }
}
const blockInterval = setInterval(showNextEl, 100);

const btnElements = document.querySelector(".buttons");
const elementsAray = [btnElements];

elementsAray.forEach((el) => {
  el.addEventListener("mouseover", () => {
    gsap.to(".blur-cursor", {
      scale: 0.05,
      backgroundColor: "#000",
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(".blur-cursor", {
      scale: 1,
      backgroundColor: "#00000080",
    });
  });
});

gsap.to(".scrollTriger", {
  opacity: 1,
  duration: 0.1,
  stagger: 0.1,
  x: 0,
  scrub: true,
  start: "top center",
  end: "bottom center",
  scrollTrigger: {
    trigger: ".scrollTriger",
  },
});
