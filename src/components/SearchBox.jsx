import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import axios from "axios";
import format from "date-fns/format";

// components
import "./Common.css";
import { Result } from "./Result";

// url
import { golfCourses } from "../urls/index";

const Today = new Date();
registerLocale("ja", ja);

export const SearchBox = () => {
  const init = {
    date: addDays(new Date(), 14),
    budget: "12000",
    departure: "1",
    duration: "90",
    plans: [],
    planCount: 0,
    error: null,
  };

  const [schedule, setSchedule] = useState(init);

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(golfCourses, {
        params: {
          date: format(schedule.date, "yyyyMMdd"),
          budget: schedule.budget,
          departure: schedule.departure,
          duration: schedule.duration,
        },
      });

      setSchedule({
        ...schedule,
        planCount: res.data.planCount,
        plans: res.data.plans,
      });
    } catch (e) {
      setSchedule({ ...schedule, error: e });
    }
  };

  return (
    <div className="ui container" id="container">
      <div className="Search__Form">
        <form className="ui form segment" onSubmit={(e) => onFormSubmit(e)}>
          <div className="field">
            <label>
              <i className="calendar alternate outline icon"></i>
              プレー日
            </label>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              locale="ja"
              selected={schedule.date}
              onChange={(e) => setSchedule({ ...schedule, date: e })}
              minDate={Today}
            />
          </div>
          <div className="field">
            <label>
              <i className="yen sign icon"></i>上限金額
            </label>
            <select
              name="dropdown"
              className="ui dropdown"
              value={schedule.budget}
              onChange={(e) =>
                setSchedule({ ...schedule, budget: e.target.value })
              }
            >
              <option value="8000">8,000円</option>
              <option value="12000">12,000円</option>
              <option value="16000">16,000円</option>
            </select>
          </div>
          <div className="field">
            <label>
              <i className="map pin icon"></i>
              移動時間計算の出発地点
            </label>
            <select
              name="dropdown"
              className="ui dropdown"
              value={schedule.departure}
              onChange={(e) =>
                setSchedule({ ...schedule, departure: e.target.value })
              }
            >
              <option value="1">東京駅</option>
              <option value="2">横浜駅</option>
            </select>
          </div>
          <div className="field">
            <label>
              <i className="car icon"></i>車での移動時間の上限
            </label>
            <select
              name="dropdown"
              className="ui dropdown"
              value={schedule.duration}
              onChange={(e) =>
                setSchedule({ ...schedule, duration: e.target.value })
              }
            >
              <option value="60">60分</option>
              <option value="90">90分</option>
              <option value="120">120分</option>
            </select>
          </div>
          <div className="Search__Button">
            <button type="submit" className="Search__Button__Design">
              <i className="search icon"></i>ゴルフ場を検索する
            </button>
          </div>
        </form>
        <Result
          plans={schedule.plans}
          planCount={schedule.planCount}
          error={schedule.error}
        />
      </div>
    </div>
  );
};
