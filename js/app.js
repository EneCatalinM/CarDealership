const Events = (() => {
  const navbar = document.querySelector(".navbar");

  //hide preloader
  window.addEventListener("load", _ =>
    document.querySelector(".preloader").classList.add("hidePreloader")
  );
  //add class to navbar
  window.addEventListener("scroll", () => {
    let height = document.documentElement.scrollTop || window.pageYOffset;

    height > 92
      ? navbar.classList.add("navbar-change")
      : navbar.classList.remove("navbar-change");
  });
})();

//create cars
const CreateCars = (() => {
  //car data
  const cars = [];

  //car class

  class Car {
    constructor(make, country, img, special, model, price, type, trans, gas) {
      this.make = make;
      this.country = country;
      this.img = img;
      this.special = special;
      this.model = model;
      this.price = price;
      this.type = type;
      this.trans = trans;
      this.gas = gas;
    }
  }
  //car creation function
  function makeCar(
    make,
    country,
    img = "../img/car-default.jpeg",
    special = true,
    model = "new model",
    price = 10000,
    type = "sedan",
    trans = "automatic",
    gas = "50"
  ) {
    const car = new Car(
      make,
      country,
      img,
      special,
      model,
      price,
      type,
      trans,
      gas
    );
    cars.push(car);
  }
  //produce cars
  function produceCars() {
    makeCar("chevy", "american");
    makeCar("mercedes", "german", "img/germanCar1.jpeg", true, "tot asa");
    makeCar(
      "mercedes",
      "german",
      "../img/germanCar2.jpeg",
      undefined,
      "tot asa"
    );
    makeCar("bmw", "german", "img/germanCar3.jpeg", undefined, "tot asa23");
    makeCar("mercedes", "german", "../img/germanCar4.jpeg", false, "cam asa");
    makeCar("bmw", "german", "../img/germanCar5.jpeg", undefined, "tot asa");
    makeCar("chevy", "american", "../img/americanCar1.jpg", false);
    makeCar("chevy", "american", "../img/americanCar2.jpeg", false);
    makeCar("chevy", "american", "../img/americanCar3.jpeg", false);
    makeCar("chevy", "american", "../img/americanCar4.jpg", false);
    makeCar(
      "chevy",
      "american",
      "../img/americanCar5.jpg",
      false,
      "LOL",
      "1",
      undefined,
      "manual",
      "70"
    );
  }
  produceCars();
  //special cars
  const specialCars = cars.filter(car => car.special === true);

  return {
    cars,
    specialCars
  };
})();
//display special cars
const displaySpecialCars = (CreateCars => {
  const cars = CreateCars.cars;
  const specialCars = CreateCars.specialCars;

  const info = document.querySelector(".featured-info");
  //document loaded event
  document.addEventListener("DOMContentLoaded", () => {
    info.innerHTML = "";
    let data = ``;

    specialCars.forEach(item => {
      data += `   <!-- single item -->
      <div class="featured-item my-3 d-flex p-2 text-capitalize align-tems-baseline flex-wrap">
          <span data-img='${item.img}' class="featured-icon mr-2">
              <i class="fas fa-car"></i>
          </span>
          <h5 class="font-weight-bold mx-1">${item.make}</h5>
          <h5 class="mx-1">${item.model}</h5>
      </div>
      <!-- end of single item -->`;
    });
    info.innerHTML = data;
  });
  //change img
  info.addEventListener("click", event => {
    if (event.target.parentElement.classList.contains("featured-icon")) {
      const img = event.target.parentElement.dataset.img;
      const photo = document.querySelector(".featured-photo");
      photo.src = img;
    }
  });
})(CreateCars);

//display all cars
const displayCars = (CreateCars => {
  //all cars
  const cars = CreateCars.cars;
  //car container
  const inventory = document.querySelector(".inventory-container");

  //content loaded
  document.addEventListener("DOMContentLoaded", () => {
    inventory.innerHTML = "";
    let output = ``;
    cars.forEach(car => {
      output += `  <!-- single car -->
      <div class="col-10 mx-auto my-3 col-md-6 col-lg-4 single-car ${
        car.country
      }">
          <div class="card car-card">
              <img src="${car.img}" alt="" class="card-img-top car-img" />
              <!-- card body -->
              <div class="card-body">
                  <div class="car-info d-flex justify-content-between">
                      <!-- first flex child -->
                      <div class="car-text text-uppercase">
                          <h6 class="font-weight-bold">${car.make}</h6>
                          <h6 class=''>${car.model}</h6>
                      </div>
                      <!-- second flex child -->
                      <h5 class="car-value align-self center py-2 px-3">
                          <span class="car-price">$${car.price}</span>
                      </h5>
                  </div>
              </div>
              <!-- end of card body -->
              <!-- card footer -->
              <div class="card-footer text-capitalize d-flex justify-content-between">
                  <p>
                      <span>
                          <i class="fas fa-car"></i>
                      </span>${car.type}</p>
                  <p>
                      <span>
                          <i class="fas fa-cogs"></i>
                      </span>${car.trans}</p>
                  <p>
                      <span>
                          <i class="fas fa-gas-pump"></i>
                      </span>${car.gas}</p>
              </div>
              <!-- end of card footer -->
          </div>
      </div>
      <!-- end of single car -->`;
    });
    inventory.innerHTML = output;
  });
})(CreateCars);

//filter cars
const filterCars = (() => {
  const filter = document.querySelectorAll(".filter-btn");

  filter.forEach(btn => {
    btn.addEventListener("click", event => {
      const value = event.target.dataset.filter;
      const singleCar = document.querySelectorAll(".single-car");
      singleCar.forEach(car => {
        if (value === "all") {
          car.style.display = "block";
        } else {
          !car.classList.contains(value)
            ? (car.style.display = "none")
            : (car.style.display = "block");
        }
      });
    });
  });
})();

//galerry
const Gallery = (() => {
  // all items
  const items = document.querySelectorAll(".gallery-item");
  //modal
  const showcase = document.querySelector(".showcase");

  items.forEach(item => {
    item.addEventListener("click", event => {
      showcase.classList.add("showcase-show");
      if (event.target.classList.contains("gallery-item")) {
        let src = event.target.childNodes[1].src;
        document.querySelector(".showcase-img").src = src;
      }
    });
  });
  //close modal
  document.querySelector(".showcase-close").addEventListener("click", _ => {
    showcase.classList.remove("showcase-show");
  });
})();
