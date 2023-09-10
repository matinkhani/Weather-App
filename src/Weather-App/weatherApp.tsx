import { useEffect, useState } from "react";
import "./weatherApp.css";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Weather() {
  const [input, setInput] = useState<string>("");
  const [api, setApi] = useState<any | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [background, setBackground] = useState<string>("");
  
  async function getApi() {
    setLoading(true);
    await fetch(
      `http://api.weatherapi.com/v1/current.json?key=f31ede78349f4189bf3140334231009&q=${input}&aqi=no`
    )
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          setApi(data);
          console.log(data);
        } else {
          alert("Please Enter a Correct City Name");
          setInput("");
          setApi(undefined);
        }
        setLoading(false);
        return res.json();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    if (!api) {
      setBackground("./Images/background.png");
    } else {
      if (api.current.is_day === 1) {
        setBackground("./Images/day.jpg");
      } else {
        setBackground("./Images/night2.jpg");
      }
    }
  }, [api]);

  return (
    <div
      className="container"
      style={
        !api
          ? { backgroundColor: "#23759c" }
          : api.current.is_day === 1
          ? { backgroundColor: "#64a2de" }
          : api.current.is_day === 0
          ? { backgroundColor: "#14388c" }
          : {}
      }
    >
      <div
        className="weather_container"
        style={{ backgroundImage: `url(${background})` }}
      >
        {loading ? (
          <div className="spinner center">
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
          </div>
        ) : (
          <>
            {api && (
              <>
                <div className="city_country_container">
                  <div
                    className="refresh_icon"
                    onClick={() => {
                      getApi();
                    }}
                  >
                    <RefreshIcon />
                  </div>
                  <p
                    style={
                      api.current.is_day === 1
                        ? { color: "#000" }
                        : { color: "#fff" }
                    }
                  >
                    {api.location.name}
                  </p>
                  <p
                    style={
                      api.current.is_day === 1
                        ? { color: "#000" }
                        : { color: "#fff" }
                    }
                  >
                    {api.location.country}
                  </p>
                </div>
                <div className="icon_container">
                  <img src={api.current.condition.icon} alt="weather_icon" />
                </div>
                <div
                  className="text_container"
                  style={
                    api.current.is_day === 1
                      ? { color: "#000" }
                      : { color: "#fff" }
                  }
                >
                  {api.current.condition.text}
                </div>
                <div className="temp_container">
                  <p
                    style={
                      api.current.is_day === 1
                        ? { color: "#000" }
                        : { color: "#fff" }
                    }
                  >
                    {api.current.temp_c + "° C"}
                  </p>
                </div>
                <div className="local_time_container">
                  <p
                    style={
                      api.current.is_day === 1
                        ? { color: "#000" }
                        : { color: "#fff" }
                    }
                  >
                    {api.location.localtime}
                  </p>
                </div>
                <div className="feels_like_container">
                  <p
                    style={
                      api.current.is_day === 1
                        ? { color: "#000" }
                        : { color: "#fff" }
                    }
                  >
                    {" "}
                    {api === undefined
                      ? ""
                      : "Feels Like : " + api.current.feelslike_c + "° C"}
                  </p>
                </div>
                <div className="humidity_container">
                  <p
                    style={
                      api.current.is_day === 1
                        ? { color: "#000" }
                        : { color: "#fff" }
                    }
                  >
                    {" "}
                    {api === undefined
                      ? ""
                      : "Humidity : " + api.current.humidity + "%"}
                  </p>
                </div>
                <div className="uv_container">
                  <p
                    style={
                      api.current.is_day === 1
                        ? { color: "#000" }
                        : { color: "#fff" }
                    }
                  >
                    {api === undefined ? "" : "UV : " + api.current.uv + " %"}
                  </p>
                </div>
                <div className="wind_mph_container">
                  <p
                    style={
                      api.current.is_day === 1
                        ? { color: "#000" }
                        : { color: "#fff" }
                    }
                  >
                    {" "}
                    {api === undefined
                      ? ""
                      : "Wind Speed : " + api.current.wind_mph + " MPH"}
                  </p>
                </div>
              </>
            )}
          </>
        )}
        <div className="input_btn_container">
          <input
            value={input}
            onChange={(e) => {
              const regex = /^[A-Za-z ]+$/;
              if (e.target.value === "" || regex.test(e.target.value)) {
                setInput(e.target.value);
              }
            }}
            placeholder="Type City Name"
          />
          <button
            onClick={() => {
              getApi();
            }}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
