import React from "react";
import "./styles.css";

const USER_DATA = [
  "Mariah Barajas",
  "Moses Townsend",
  "Elisha Huynh",
  "Mylie Bird",
  "Dawson Brandt",
  "Amya Best",
  "Coleman Luna",
  "Nora Kemp",
  "Geovanni Carrillo",
  "King Silva",
  "Bridget Wells",
  "Nico Savage",
  "Yasmine Silva",
  "Amiah Goodman",
  "Mila Shields",
  "Thomas Mccoy",
  "Zachary Ferguson",
  "Jennifer Alvarez",
  "Jamie Whitney",
  "Jensen Bush",
  "Savannah Coleman",
  "Eliezer Petty",
  "Deven Hendrix",
  "Hayden Weeks",
  "Jacoby Peck",
  "Jessica Duarte",
  "Ryleigh Berry",
  "Danica Olson",
  "Asher Gutierrez",
  "Henry Thompson",
  "Tiana Lowery",
  "Eve Arnold",
  "Michael Harding",
  "Marely Olsen",
  "Lillianna Duffy",
  "Giovanni Olson",
  "Kiersten Rowland",
  "Nash Rollins",
  "Ayana Quinn",
  "Jamie James",
  "Jasmin Johnson",
  "Dominique Hicks",
  "Kasey Bond",
  "Ariella Crosby",
  "Sheldon Barron"
];

export default class SearchApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      page: 1,
      totalPages: NaN,
      size: 10,
      data: [],
      displayData: []
    };
    // code here
  }

  componentDidMount() {
    const { page, size } = this.state;

    this.setState({
      totalPages: Math.ceil(USER_DATA.length / size)
    });

    this.setState({
      data: USER_DATA,
      displayData: [...USER_DATA].splice((page - 1) * size, size)
    });
  }

  refreshData() {
    const { searchValue, page, size } = this.state;

    let data = USER_DATA;
    let totalPages = Math.ceil(USER_DATA.length / size);

    /* code below this line */
    if (searchValue.length !== 0) {
      console.log(searchValue);
      data = data.filter((term) => {
        return term.includes(searchValue);
      });
      totalPages = Math.ceil(data.length / size);
      this.setState({ page: 1 });
      console.log(data);
    }
    /* code above this line */
    let displayData = [...data].splice((page - 1) * size, size);
    console.log(page);
    this.setState({
      data,
      totalPages,
      displayData
    });
  }

  handleSearch = (searchValue) => {
    this.setState(
      {
        searchValue: searchValue
      },
      this.refreshData
    );
  };

  updateDisplayList = () => {
    const { page, size } = this.state;
    let displayData = [...this.state.data].splice((page - 1) * size, size);
    this.setState({
      displayData
    });
  };

  handlePrev = () => {
    const { page } = this.state;
    this.setState(
      {
        page: page === 1 ? page : page - 1
      },
      this.updateDisplayList
    );
  };

  handleNext = () => {
    const { page, totalPages } = this.state;
    this.setState(
      {
        page: page === totalPages ? page : page + 1
      },
      this.updateDisplayList
    );
  };

  render() {
    return (
      <div id="search-app">
        <SearchInput onChange={this.handleSearch} />
        <DataList data={this.state.displayData} />
        <div id="button-container">
          <button
            className="btn"
            disabled={this.state.page === 1}
            id="prev-button"
            onClick={this.handlePrev}
          >
            Prev
          </button>
          <button
            className="btn"
            disabled={
              this.state.page === this.state.totalPages ||
              this.state.totalPages === 0
            }
            id="next-button"
            onClick={this.handleNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    this.setState({
      value: inputValue
    });
    this.props.onChange(inputValue);
  }

  render() {
    return (
      <div className="searchbar">
        <label className="lbl">Search Data</label>
        <br />
        <br />
        <input
          type="text"
          className="ip"
          value={this.state.value}
          placeholder="Search Here..."
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class DataList extends React.Component {
  render() {
    return (
      <div>
        {this.props.data.map((dataVal) => (
          <p> {dataVal} </p>
        ))}
      </div>
    );
  }
}
