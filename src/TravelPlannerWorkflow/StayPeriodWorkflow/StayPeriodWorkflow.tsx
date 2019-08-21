import 'react-input-range/lib/css/index.css';
import './StayPeriodWorkflow.scss';

import { City } from '../../Services/LocationServices';

import InputRange, { Range } from 'react-input-range';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';

interface StayPeriodWorkflowProps {
  cities: City[];
  onSubmit: (stayPeriods: CityToStayPeriodMapping) => void;
}

interface CityStayPeriod {
  cityName: string;
  minDays: number;
  maxDays: number;
}

export interface CityToStayPeriodMapping {
  [cityId: string]: CityStayPeriod
}

const StayPeriodWorkflow: React.FC<StayPeriodWorkflowProps> = props => {
  const [stayPeriods, setStayPeriods] = useState<CityToStayPeriodMapping>({});
  const confirmButtonRef = useRef<any>(null);

  useEffect(() => {
    var initialPeriods = props.cities.reduce<CityToStayPeriodMapping>((mappings, currCity) => {
      mappings[currCity.id] = {cityName: currCity.name, minDays: 3, maxDays: 5};
      return mappings;
    }, {});
    setStayPeriods(initialPeriods);
  }, [props.cities]);
  useEffect(() => confirmButtonRef.current.focus(), []);

  return (
    <div>
      <form>
      {
        Object.entries(stayPeriods).map(([cityId, {cityName, minDays, maxDays}]) => (
          <span key={cityId}>
            <h4>
              <em>Eu gostaria de ficar em {cityName} entre {minDays} e {maxDays} dias.</em>
            </h4>
            <br />
            <InputRange
              minValue={1}
              maxValue={30}
              value={{min: minDays, max: maxDays}}
              onChange={value => {
                var range = value as Range;
                setStayPeriods({...stayPeriods, [cityId]: {cityName, minDays: range.min, maxDays: range.max}})
              }} />
            <br />
          </span>
        ))
      }
      </form>
      <br />
      <Button ref={confirmButtonRef} onClick={() => props.onSubmit(stayPeriods)} size="lg" className="float-right">
        <b>↵</b>
      </Button>
    </div>
  );
}

export default StayPeriodWorkflow;