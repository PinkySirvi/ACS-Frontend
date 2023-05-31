import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import 'primeicons/primeicons.css';
import { SelectButton } from 'primereact/selectbutton';
import { Checkbox } from 'primereact/checkbox';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputTextarea } from 'primereact/inputtextarea';
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";


const Resign = () => {

  const [date3, setDate3] = useState(null);
  const [date4, setDate4] = useState(null);
  const [comments, setComments] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [num, setNum] = useState('');
  const [savee, setSavee] = useState('');
  const [other, setOther] = useState('');
  const [lastpost, setLastpost] = useState('');

  // checkbox
  const [cities, setCities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState();

  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save = () =>
    console.log(sigCanvas.getTrimmedCanvas().toDataURL("image/png"));

  // post method 
  function saveUser() {
    console.warn({ firstname, middlename, lastname, email, num, date3, lastpost, comments, savee, date4 });
    let data = { firstname, middlename, lastname, email, num, date3, lastpost, comments, savee, date4 }
    fetch(`${process.env.REACT_APP_API_KEY}/resign`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)

    }).then((result) => {
      // console.warn("result",result);
      result.json().then((resp) => {
        console.warn("resp", resp)
      })
    })
  }

  return (

    <div>
      <Card
        style={{ height: "80vh", marginLeft: "200px", border: "1px solid", borderRadius: "10px",width:"550px" }} >

        <h1 style={{ marginLeft: "20px", fontFamily: "Times New Roman, Times, serif", color: "darkgray" }}>Resignation Form</h1>     <br></br>

        <div class="grid" >
          <ScrollPanel style={{ height: '60vh', color: "gray" }}>

            <div class="card" style={{ marginBottom: "-20px" }}>
              <div class="grid">

                <div class="field col-12 md:col-4" >
                  <label style={{ fontFamily: "serif", marginLeft: "10px" }}>  FirstName   </label><br></br>
                  <input type="text" value={firstname} onChange={(e) => { setFirstname(e.target.value) }} style={{ height: "30px", width: "170px" }} />
                </div>

                <div class="field col-12 md:col-4">
                  <label style={{ fontFamily: "serif" }}>  MiddleName   </label><br></br>
                  <input type="text" value={middlename} onChange={(e) => { setMiddlename(e.target.value) }} style={{ height: "30px", width: "170px" }} />
                </div>

                <div class="field col-12 md:col-4">
                  <label style={{ fontFamily: "serif" }}>  LastName   </label><br></br>
                  <input type="text" value={lastname} onChange={(e) => { setLastname(e.target.value) }} style={{ height: "30px", width: "170px" }} />
                </div>
              </div>
            </div>

            <div class="field col" style={{ marginBottom: "-15px" }}>
              <label style={{ fontFamily: "serif" }}> Employee Email </label><br></br>
              <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} style={{ height: "30px", width: "300px" }} />
            </div>

            <div class="field col" style={{ marginBottom: "5px" }}>
              <label style={{ fontFamily: "serif" }}> Social Security Number </label><br></br>
              <input type="text" value={num} onChange={(e) => { setNum(e.target.value) }} style={{ height: "35px", width: "300px" }} />
            </div>

            <div class="field col-12 md:col-12" style={{ marginBottom: "-5px" }}>
              <label htmlFor="date" className="block" style={{ fontFamily: "serif" }}>I hereby tender my resignation as an employee of --------, Inc. to be effective on:</label>
              <input style={{ height: "40px", width: "15em" }} type="date" value={date3} onChange={(e) => { setDate3(e.target.value) }} />
            </div>

            {/* <div class="field col">
              <label style={{ fontFamily: "serif" }}> My last assigned post was:  </label><br></br>
              <input type="text" style={{ height: "35px", width: "300px" }} />
            </div> */}
            
            <div class="field col">
              <label style={{ fontFamily: "serif" }}> My last assigned post was: </label><br></br>
              <input type="text" value={lastpost} onChange={(e) => { setLastpost(e.target.value) }} style={{ height: "35px", width: "300px" }} />
            </div>

            <div className="card">
              {/* <h5>I am resigning because (Check appropriate box below)</h5> <br /> */}
              {/* <div style={{ marginLeft: "130px" }}>
                <div className="field-checkbox">
                  <Checkbox inputId="city1" value="Mutual Agreement(not protestable)" onChange={onCityChange} checked={cities.indexOf('Mutual Agreement(not protestable)') !== -1} />
                  <label htmlFor="city1">Mutual Agreement(not protestable)</label>
                </div>
                <div className="field-checkbox">
                  <Checkbox inputId="city2" name="city" value="Accepted another or better job" onChange={onCityChange} checked={cities.indexOf('Accepted another or better job') !== -1} />
                  <label htmlFor="city2">Accepted another or Better Job</label>
                </div>
                <div className="field-checkbox">
                  <Checkbox inputId="city3" name="city" value="Temporary Job Assignment" onChange={onCityChange} checked={cities.indexOf('Temporary Job Assignment') !== -1} />
                  <label htmlFor="city3">Temporary Job Assignment</label>
                </div>
                <div className="field-checkbox">
                  <Checkbox inputId="city4" name="city" value="Personal(explain below)" onChange={onCityChange} checked={cities.indexOf('Personal(explain below)') !== -1} />
                  <label htmlFor="city4">Personal(explain below)</label>
                </div>
                <div className="field-checkbox">
                  <Checkbox inputId="city5" name="city" value="Transportation Problem" onChange={onCityChange} checked={cities.indexOf('Transportation Problem') !== -1} />
                  <label htmlFor="city5">Transportation Problem</label>
                </div>
                <div className="field-checkbox">
                  <Checkbox inputId="city6" name="city" value="Dissatisfied (explain below)" onChange={onCityChange} checked={cities.indexOf('Dissatisfied (explain below)') !== -1} />
                  <label htmlFor="city6">Dissatisfied (explain below)</label>
                </div>
                <div className="field-checkbox">
                  <Checkbox inputId="city7" name="city" value="Moved from area" onChange={onCityChange} checked={cities.indexOf('Moved from area') !== -1} />
                  <label htmlFor="city7">Moved from area</label>
                </div>
                <div className="field-checkbox">
                  <Checkbox inputId="city8" name="city" value="other" onChange={onCityChange} checked={cities.indexOf('other') !== -1} /> &nbsp;
                  <input type="text" placeholder="Other" value={other} onChange={(e) => { setOther(e.target.value) }} style={{ height: "30px", width: "200px" }} />
                </div>
              </div> */}

              <div>
                <label style={{ fontFamily: "serif" }}> Comments   </label><br></br>
                <InputTextarea value={comments} onChange={(e) => setComments(e.target.value)} rows={4} cols={30} />
              </div>
            </div>                         <br />

            <div>
              <h5 style={{ fontFamily: "serif" }}>Employee Signature</h5>
              <Popup modal trigger={<button>Open Signature Pad</button>}
                closeOnDocumentClick={false}
              >
                {close => (
                  <>
                    <SignaturePad
                      ref={sigCanvas}
                      canvasProps={{
                        className: "signatureCanvas"
                      }}
                    />
                    <br />
                    <button onClick={save}>Save</button>
                    <button onClick={clear}>clear</button>
                    <button onClick={close}>close</button>
                  </>
                )}
              </Popup>
            </div>

            <div class="field col-12 md:col-12" style={{ marginBottom: "-5px" }}>
              <label htmlFor="date" className="block" style={{ fontFamily: "serif" }}>Date Signed</label>
              <input style={{ height: "40px", width: "15em" }} type="date" value={date4} onChange={(e) => { setDate4(e.target.value) }} />
            </div>

            <div style={{ marginRight: "10px", marginTop: "20px" }}>
              <Button
                style={{ height: "40px", width: "95px" }}
                label="Submit"
                onClick={saveUser}
                type="button"
                className="p-button-outlined" />
            </div>

          </ScrollPanel>
        </div>

      </Card>

    </div>

  );
}

export default Resign;
