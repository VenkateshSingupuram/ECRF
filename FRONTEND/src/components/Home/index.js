
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
// import {  ExpandLessIcon } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment, { duration } from "moment";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import { formatDate } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { Form } from 'react-bootstrap';
import config from "../../config";

const Home = () => {
  const navigate = useNavigate();
  const { apiUrl } = config;
  const [studyButton, setStudyButton] = useState(true);
  const studyButtonHandle = () => {
    setStudyButton(!studyButton);
  };
  const [studyTitle, setStudyTitle] = useState("");
  const [projectNo, setProjectNo] = useState("");
  const [siteId, setSiteId] = useState("");
  const [studyDate, setStudyDate] = useState(getFormattedDate(new Date()));
  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const [subjectButton, setSubjectButton] = useState(true);
  const subjectButtonHandle = () => {
    setSubjectButton(!subjectButton);
  };
  const [subjectId, setSubjectId] = useState("");
  const [subjectCounter, setSubjectCounter] = useState("");
  const [subjectYear, setSubjectYear] = useState("");
  const [subjectUnknown, setSubjectUnknown] = useState([]);
  const [studyTitles, setStudyTitles] = useState([]);
  const [studyProjects, setStudyProjects] = useState([]);
  const handleSubjectUnknown = (values) => {
    let updatedValues;
    if (subjectUnknown.includes(values)) {
      updatedValues = subjectUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...subjectUnknown, values];
    }
    setSubjectUnknown(updatedValues);
    setSubjectYear("");
  };
  const [subjectGender, setSubjectGender] = useState("");
  const [otherCheck, setOtherCheck] = useState("");
  const [subjectOtherText, setSubjectOtherText] = useState("");
  const [placeOfBirthCity, setPlaceOfBirthCity] = useState("");
  const [placeOfBirthState, setPlaceOfBirthState] = useState("");
  const [residencyCity, setResidencyCity] = useState("");
  const [residencyState, setResidencyState] = useState("");
  // const [sexOfPatient, setSexOfPatient] = useState();

  const [nationalityOther, setNationalityOther] = useState();

  useEffect(() => {
    getStudyPreDetails();
    const token = Cookies.get('tkn');
    if (token) {
      const data = jwtDecode(token);
      if (data) {
        setSiteId(data?.SiteId);
        // setSubjectId(data?.SubjectId);
      }
    }
  }, []);

  const getStudyPreDetails = () => {
    const token = Cookies.get('tkn');
    if (!token) {
      navigate('/login');
    }
    fetch(
      `${apiUrl}/eCRF-rest-service/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    )
      .then((response) => {
        if (!response.ok) {
          setStudyProjects([]);
          setStudyTitles([]);
          throw new Error('Request failed with status code ' + response.status);
        }
        return response.json()
      })
      .then((data) => {
        // console.log(data);
        if (Array.isArray(data)) {
          const studyIds = data.map(item => item.studyId);
          if (studyIds.length) {
            setStudyProjects(studyIds);
            setProjectNo(studyIds[0]);
          }
          const studyTitles = data.map(item => item.studyTitle);
          if (studyTitles.length) {
            setStudyTitles(studyTitles);
            setStudyTitle(studyTitles[0]);
          }
        } else if (data.error) {

        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // BaseLine Characteristics initialize
  const [baseLineButton, setBaseLineButton] = useState(true);
  const [dateOfHcc, setDateOfHcc] = useState(null);
  const [baseLineIfDate, setBaseLineIfDate] = useState("");
  const [baseLineIfDateRadio, setBaseLineIfDateRadio] = useState([]);
  const handleBaseLineRadio = (values) => {
    let updatedValues;
    if (baseLineIfDateRadio.includes(values)) {
      updatedValues = baseLineIfDateRadio.filter((item) => item !== values);
    } else {
      updatedValues = [...baseLineIfDateRadio, values];
    }
    setBaseLineIfDateRadio(updatedValues);
    setDateOfHcc("");
    setBaseLineIfDate("");
  };

  const [baseLineAgeOfHcc, setBaseLineAgeOfHcc] = useState("");
  const [baseLineHeight, setBaseLineHeight] = useState("");
  const [weightHggBaseLine, setWeightHggBaseLine] = useState("");
  const [bmiBaseLine, setBmiBaseLine] = useState();
  const [insuranceValue, setInsuranceValue] = useState("");
  const [insuraceValueOtherBaseline, setInsuranceValueOtherBaseline] =
    useState("");
  const [insuraceDetailsBaseLine, setInsuranceDetailsBaseLine] = useState("");
  const baseLineCharacterButtonHandle = () => {
    setBaseLineButton(!baseLineButton);
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        calculateBMI();

        // const intervalId = setInterval(async () => {
        try {
          const token = Cookies.get('tkn');
          if (!token) {
            navigate('/login');
          }
          const response = await fetch(
            `${apiUrl}/eCRF-rest-service/getTotalRecordCount`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          // // console.log(data, "daaaaaaaaaaa");
          // // console.log(typeof data);
          setCount(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          // clearInterval(intervalId); // Stop the interval on error
        }
        // }, 100);

        // Cleanup function to clear the interval when the component unmounts
        // return () => clearInterval(intervalId);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    fetchData();
  }, [baseLineHeight, weightHggBaseLine]); // Empty dependency array to run the effect only once on mount

  const calculateBMI = () => {
    if (baseLineHeight && weightHggBaseLine) {
      const heightInMeters = baseLineHeight / 100;
      const bmiValue = (
        weightHggBaseLine /
        (heightInMeters * heightInMeters)
      ).toFixed(2);
      setBmiBaseLine(bmiValue);
    } else {
      setBmiBaseLine("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    function formatDate(date) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      var hours = String(date.getHours()).padStart(2, "0");
      var minutes = String(date.getMinutes()).padStart(2, "0");
      var seconds = String(date.getSeconds()).padStart(2, "0");

      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    }
    // Example usage:
    var date = new Date(); // Current date and time
    var formattedDate = formatDate(date);
    const token = Cookies.get('tkn');
    if (!token) {
      navigate('/login');
    }

    fetch(`${apiUrl}/eCRF-rest-service/addRecord`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        createDate: formattedDate,
        status: `at reviewer`,
        dispatchedFrom: "ROLE_DATAENTRY",
        dispatchedTo: "ROLE_REVIEWER",
        subjectId: subjectId,
        siteId: siteId,
        section1: {
          studyTitle,
          projectNo,
          siteId,
          studyDate,
        },
        section2: {
          // subjectId,
          subjectCounter,
          subjectYear,
          subjectUnknown,
          subjectGender,
          otherCheck,
          // nationality,
          // nationalityOther,
          subjectOtherText,
          placeOfBirthCity,
          placeOfBirthState,
          residencyCity,
          residencyState,
        },
        section3: {
          dateOfHcc,
          baseLineIfDate,
          baseLineIfDateRadio,
          baseLineAgeOfHcc,
          baseLineHeight,
          weightHggBaseLine,
          bmiBaseLine,
          insuranceValue,
          insuraceValueOtherBaseline,
          insuraceDetailsBaseLine,
        },
        section4: {
          hemoGlobinFrom,
          hemoGlobinTo,
          hemoGlobinValue,
          hemoGlobinUnknown,
          alanineFrom,
          alanineTo,
          alanineValue,
          alanineUnknown,
          aspartateFrom,
          aspartateTo,
          aspartateValue,
          aspartateUnknown,
          bilirubinFrom,
          bilirubinTo,
          bilirubinValue,
          bilirubinUnknown,
          alkalineFrom,
          alkalineTo,
          alkalineValue,
          alkalineUnknown,
          albuminFrom,
          albuminTo,
          albuminValue,
          albuminUnknown,
          platelatesFrom,
          platelatesTo,
          platelatesValue,
          platelatesUnknown,
          creatinineFrom,
          creatinineTo,
          creatinineValue,
          creatinineUnknown,
          prothrombinFrom,
          prothrombinTo,
          prothrombinValue,
          prothrombinUnknown,
          internationalFrom,
          internationalTo,
          internationalValue,
          internationalUnknown,
          alphaFrom,
          alphaTo,
          alphaValue,
          alphaUnknown,
          sodiumFrom,
          sodiumTo,
          sodiumValue,
          sodiumUnknown,
          bloodUreaFrom,
          bloodUreaTo,
          bloodUreaValue,
          bloodUreaUnknown,
          cholesterolFrom,
          cholesterolTo,
          cholesterolValue,
          cholesterolUnknown,
          triglyceridesFrom,
          triglyceridesTo,
          triglyceridesValue,
          triglyceridesUnknown,
          highDenistyFrom,
          highDensityTo,
          highDensityValue,
          highDensityUnknown,
          lowDensityFrom,
          lowDensityTo,
          lowDensityValue,
          lowDensityUnknown,
          meldScoreLab,
          modelEndStageTextArea,
          modelEndStageLab,
          fib4Lab,
          astPlateletLab,
          hemoglobinUnit: '%',
          alanineUnit: 'units/l',
          aspartateUnit: 'units/l',
          bilirubinUnit: 'mg/dl',
          alkalineUnit: 'units/l',
          albuminUnit: 'g/dl',
          platelatesUnit: 'k/μl (X 109 /μl)',
          creatinineUnit: 'mg/dl',
          prothrombinUnit: 'seconds',
          internationalUnit: 'N/A',
          alphaUnit: 'ng/ml',
          sodiumUnit: 'mmoi/l',
          bloodUreaUnit: 'mg/dl',
          cholesterolUnit: 'mg/dl',
          triglyceridesUnit: 'mg/dl',
          highDensityUnit: 'mg/dl',
          lowDensityUnit: 'mg/dl'
        },
        section5: {
          diabetesComorbidities,
          hypertensionComorbidities,
          dyslipidemiaComorbidities,
          coronaryComorbidities,
          peripheralComorbidities,
          hivComorbidities,
          diabetesAfter,
          hypertensionAfter,
          dysliAfter,
          coronaryAfter,
          peripheralAfter,
          hivAfter,
          // isChecked,
          yesDiabetesInput,
          yesHyperTensionInput,
          yesDyslipidemiaInput,
          yesCoronaryInput,
          yesPeripheralInput,
          yesHivInput,
          nonLiverCancer,
          yesLocationSiteValue,
          yesStageValue,
          yesYearOfDiagnosis,
          alcoholConsumptionValue,
          alcoholConsumptionValueSub,
        },
        section6: {
          diagnosisInformationValue,
          hccDiagnosisInfoValueOtherSpecify,
          typeOfImagine,
          typeOfImagineText,
          hccDiagnosisImagingUnkown,
          hccDiagnosisTissueUnknown,
          hccDiagnosisImagingDate,
          hccDiagnosisTissueDate,
        },
        section7: {
          largeTurmorValue,
          tPrimaryValue,
          nRegionalValue,
          mRegionalValue,
          anatomicStageTNM,
          tumorDiffValue,
          ecogperformace,
          tumorStageValue,
          typeOfVascular,
          microvascularInvasion,
          tumorWithinMilan,
          childPughClassfication,
          barcelonaClinic,
        },
        section8: {
          fattyLiverCLD,
          fattyLiverRadioLast,
          fattyLiverDiagnosticFreeText,
          cirrhosisStatusValue,
          mittalCriteriaValue,
          underlyingEtiologyValue,
          etiologyCirrhosisFreeValue,
          complicationCLD,
        },
        section9: {
          hccOutcomeValue,
          treamentModalitiesHCC,
          resectionPerformed,
          liverTransplantValue,
          recurrenceValue,
          selectedDateOfFirstRecurrence,
          survivalStatusValue,
          selectedDateOfDeath,
          dateOfDeathUnknown,
          selectedDateOfLastContact,
          lastContactUnknown,
          selectedDateOfRecurrenceFree,
          selectedDateOfOverallSurvival,
        },
        section10: {
          screeningQuestion,
          screeningQuestionNa,
          screening2Years,
          screening1Year,
          methodOfScreening,
          methodOfScreeningTxt,
        },
        section11: {
          historyHIV,
          yearOfHIVHCC,
          dateOfHIVDurationFrom,
          hivRNAHCC,
          belowRadioHCC,
          belowLimitDefect,
          hivCD4,
          hivCD4Nav,
          hivAbsoluteCD4,
          hivAbsoluteCD4Nav,
          hivCD4CellCount,
          hivCD4CellCountNav,
          hivInitialHIV1,
          hivInitialHIV1Nav,
          maximumHIVRNA,
          maximumHIVRNANav,
          hivRNAHCCUnit: 'copies/mL'
        },
        section12: {
          isDateHCVDiagnosis,
          dateOfHCVCVirus,
          isHCViralCVirus,
          HCVviralTimeOfHCCDiagnosis,
          hcvGenotype,
          wasHCVReceivedBeforeAfter,
          hcvTreatmentCVirus,
          hcvTreatedYear,
          hcvViralLoadAfterTreatment,
          hcvPostTreatment,
          sustainedHCV,
          yearSVRHCV,
          hCVviralTimeOfHCCDiagnosisUnit: 'IU/mL',
          hcvPostTreatmentUnit: 'IU/mL'
        },
        section13: {
          isDateHBVDiagnosis,
          dateOfHBVBVirus,
          isHBViralBVirus,
          HBVviralTimeOfHCCDiagnosis,
          wasHBVReceivedBeforeAfter,
          hcvTreatmentBVirus,
          dateOfHBVTreatmentYear,
          hbvViralLoadAfterTreatment,
          hbvPostTreatment,
          hBVviralTimeOfHCCDiagnosisUnit: 'IU/ml',
          hbvPostTreatmentUnit: 'IU/ml'
        },
        section14: {
          createdBy,
          createdOn: formattedDate,
          changedBy,
          changedOn: formattedDate,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    alert("Record sent to Reviewer Successfully");
    navigate("/");
  };

  //Laboratory Parameters initializer
  const [laboratoryButton, setLaboratoryButton] = useState(true);
  const [hemoGlobinValue, setHemoglobinValue] = useState("");
  const [hemoGlobinFrom, setHemoGlobinFrom] = useState("");
  const [hemoGlobinTo, setHemoGlobinTo] = useState("");
  const [hemoGlobinUnknown, setHemoGlobinUnknown] = useState([]);
  const handleglobin = (values) => {
    let updatedValues;
    if (hemoGlobinUnknown.includes(values)) {
      updatedValues = hemoGlobinUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...hemoGlobinUnknown, values];
    }
    setHemoGlobinUnknown(updatedValues);
    setHemoGlobinFrom("");
    setHemoGlobinTo("");
    setHemoglobinValue("");
  };
  // // console.log(hemoGlobinUnknown);

  const [alanineValue, setAlanineValue] = useState("");
  const [alanineFrom, setAlanineFrom] = useState("");
  const [alanineTo, setAlanineTo] = useState("");
  const [alanineUnknown, setAlanineUnknown] = useState([]);
  const handlealanine = (values) => {
    let updatedValues;
    if (alanineUnknown.includes(values)) {
      updatedValues = alanineUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...alanineUnknown, values];
    }

    setAlanineUnknown(updatedValues);
    setAlanineFrom("");
    setAlanineTo("");
    setAlanineValue("");
  };

  const [aspartateValue, setAspartateValue] = useState("");
  const [aspartateFrom, setAspartateFrom] = useState("");
  const [aspartateTo, setAspartateTo] = useState("");
  const [aspartateUnknown, setAspartateUnknown] = useState([]);
  const handleaspartate = (values) => {
    let updatedValues;
    if (aspartateUnknown.includes(values)) {
      updatedValues = aspartateUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...aspartateUnknown, values];
    }

    setAspartateUnknown(updatedValues);
    setAspartateFrom("");
    setAspartateTo("");
    setAspartateValue("");
  };

  const [bilirubinValue, setBilirubinValue] = useState("");
  const [bilirubinFrom, setBilirubinFrom] = useState("");
  const [bilirubinTo, setBilirubinTo] = useState("");
  const [bilirubinUnknown, setBilirubinUnknown] = useState([]);
  const handlebilirubbin = (values) => {
    let updatedValues;
    if (bilirubinUnknown.includes(values)) {
      updatedValues = bilirubinUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...bilirubinUnknown, values];
    }
    setBilirubinUnknown(updatedValues);
    setBilirubinFrom("");
    setBilirubinTo("");
    setBilirubinValue("");
  };

  const [alkalineValue, setAlkalineValue] = useState("");
  const [alkalineFrom, setAlkalineFrom] = useState("");
  const [alkalineTo, setAlkalineTo] = useState("");
  const [alkalineUnknown, setAlkalineUnknown] = useState([]);
  const handlealkaline = (values) => {
    let updatedValues;
    if (alkalineUnknown.includes(values)) {
      updatedValues = alkalineUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...alkalineUnknown, values];
    }
    setAlkalineUnknown(updatedValues);
    setAlkalineFrom("");
    setAlkalineTo("");
    setAlkalineValue("");
  };

  const [albuminValue, setAlbuminValue] = useState("");
  const [albuminFrom, setAlbuminFrom] = useState("");
  const [albuminTo, setAlbuminTo] = useState("");
  const [albuminUnknown, setAlbuminUnknown] = useState([]);
  const handlealbumin = (values) => {
    let updatedValues;
    if (albuminUnknown.includes(values)) {
      updatedValues = albuminUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...albuminUnknown, values];
    }
    setAlbuminUnknown(updatedValues);
    setAlbuminFrom("");
    setAlbuminTo("");
    setAlbuminValue("");
  };

  const [platelatesValue, setPlatelatesValue] = useState("");
  const [platelatesFrom, setPlatelatesFrom] = useState("");
  const [platelatesTo, setPlatelatesTo] = useState("");
  const [platelatesUnknown, setPlatelatesUnknown] = useState([]);
  const handleplatelates = (values) => {
    let updatedValues;
    if (platelatesUnknown.includes(values)) {
      updatedValues = platelatesUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...platelatesUnknown, values];
    }
    setPlatelatesUnknown(updatedValues);
    setPlatelatesFrom("");
    setPlatelatesTo("");
    setPlatelatesValue("");
  };
  const [creatinineValue, setCreatinineValue] = useState("");
  const [creatinineFrom, setCreatinineFrom] = useState("");
  const [creatinineTo, setCreatinineTo] = useState("");
  const [creatinineUnknown, setCreatinineUnknown] = useState([]);
  const handlecreatinine = (values) => {
    let updatedValues;
    if (creatinineUnknown.includes(values)) {
      updatedValues = creatinineUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...creatinineUnknown, values];
    }
    setCreatinineUnknown(updatedValues);
    setCreatinineFrom("");
    setCreatinineTo("");
    setCreatinineValue("");
  };

  const [prothrombinValue, setProthrombinValue] = useState("");
  const [prothrombinFrom, setProthrombinFrom] = useState("");
  const [prothrombinTo, setProthrombinTo] = useState("");
  const [prothrombinUnknown, setProthrombinUnknown] = useState([]);
  const handleprothrobin = (values) => {
    let updatedValues;
    if (prothrombinUnknown.includes(values)) {
      updatedValues = prothrombinUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...prothrombinUnknown, values];
    }
    setProthrombinUnknown(updatedValues);
    setProthrombinFrom("");
    setProthrombinTo("");
    setProthrombinValue("");
  };

  const [internationalValue, setInternationalValue] = useState("");
  const [internationalFrom, setInternationalFrom] = useState("");
  const [internationalTo, setinternationalTo] = useState("");
  const [internationalUnknown, setInternationalUnknown] = useState([]);
  const handleinternational = (values) => {
    let updatedValues;
    if (internationalUnknown.includes(values)) {
      updatedValues = internationalUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...internationalUnknown, values];
    }
    setInternationalUnknown(updatedValues);
    setInternationalFrom("");
    setinternationalTo("");
    setInternationalValue("");
  };

  const [alphaValue, setAlphaValue] = useState("");
  const [alphaFrom, setAlphaFrom] = useState("");
  const [alphaTo, setAlphaTo] = useState("");
  const [alphaUnknown, setAlphaUnknown] = useState([]);
  const handlealpha = (values) => {
    let updatedValues;
    if (alphaUnknown.includes(values)) {
      updatedValues = alphaUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...alanineUnknown, values];
    }
    setAlphaUnknown(updatedValues);
    setAlphaFrom("");
    setAlphaTo("");
    setAlphaValue("");
  };

  const [sodiumValue, setSodiumValue] = useState("");
  const [sodiumFrom, setSodiumFrom] = useState("");
  const [sodiumTo, setSodiumTo] = useState("");
  const [sodiumUnknown, setSodiumUnknown] = useState([]);
  const handlesodium = (values) => {
    let updatedValues;
    if (sodiumUnknown.includes(values)) {
      updatedValues = sodiumUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...sodiumUnknown, values];
    }
    setSodiumUnknown(updatedValues);
    setSodiumFrom("");
    setSodiumTo("");
    setSodiumValue("");
  };

  const [bloodUreaValue, setBloodUreaValue] = useState("");
  const [bloodUreaFrom, setBloodUreaFrom] = useState("");
  const [bloodUreaTo, setBloodUreaTo] = useState("");
  const [bloodUreaUnknown, setBloodUreaUnknown] = useState([]);
  const handlebloodurea = (values) => {
    let updatedValues;
    if (bloodUreaUnknown.includes(values)) {
      updatedValues = bloodUreaUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...bloodUreaUnknown, values];
    }
    setBloodUreaUnknown(updatedValues);
    setBloodUreaFrom("");
    setBloodUreaTo("");
    setBloodUreaValue("");
  };

  const [cholesterolValue, setCholesterolValue] = useState("");
  const [cholesterolFrom, setCholesterolFrom] = useState("");
  const [cholesterolTo, setCholesterolTo] = useState("");
  const [cholesterolUnknown, setCholesterolUnknown] = useState([]);
  const handlecholesterol = (values) => {
    let updatedValues;
    if (cholesterolUnknown.includes(values)) {
      updatedValues = cholesterolUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...cholesterolUnknown, values];
    }
    setCholesterolUnknown(updatedValues);
    setCholesterolFrom("");
    setCholesterolTo("");
    setCholesterolValue("");
  };

  const [triglyceridesValue, setTriglyceridesValue] = useState("");
  const [triglyceridesFrom, setTriglyceridesFrom] = useState("");
  const [triglyceridesTo, setTriglyceridesTo] = useState("");
  const [triglyceridesUnknown, setTriglyceridesUnknown] = useState([]);
  const handletriglycerides = (values) => {
    let updatedValues;
    if (triglyceridesUnknown.includes(values)) {
      updatedValues = triglyceridesUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...triglyceridesUnknown, values];
    }
    setTriglyceridesUnknown(updatedValues);
    setTriglyceridesFrom("");
    setTriglyceridesTo("");
    setTriglyceridesValue("");
  };

  const [highDensityValue, setHighDensityValue] = useState("");
  const [highDenistyFrom, setHighDenistyFrom] = useState("");
  const [highDensityTo, setHighDensityTo] = useState("");
  const [highDensityUnknown, setHighDensityUnknown] = useState([]);
  const handlehighdensity = (values) => {
    let updatedValues;
    if (highDensityUnknown.includes(values)) {
      updatedValues = highDensityUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...highDensityUnknown, values];
    }
    setHighDensityUnknown(updatedValues);
    setHighDenistyFrom("");
    setHighDensityTo("");
    setHighDensityValue("");
  };

  const [lowDensityValue, setLowDensityValue] = useState("");
  const [lowDensityFrom, setLowDensityFrom] = useState("");
  const [lowDensityTo, setLowDensityTo] = useState("");
  const [lowDensityUnknown, setLowDensityUnknown] = useState([]);
  const handlelowdensity = (values) => {
    let updatedValues;
    if (lowDensityUnknown.includes(values)) {
      updatedValues = lowDensityUnknown.filter((item) => item !== values);
    } else {
      updatedValues = [...lowDensityUnknown, values];
    }
    setLowDensityUnknown(updatedValues);
    setLowDensityFrom("");
    setLowDensityTo("");
    setLowDensityValue("");
  };

  const [modelEndStageLab, setModelEndStageLab] = useState("");
  useEffect(() => {
    console.log('as', modelEndStageLab);
  }, [modelEndStageLab]);
  const [modelEndStageTextArea, setModelEndStageTextArea] = useState("");
  const [meldScoreLab, setMeldScoreLab] = useState("");
  const [fib4Lab, setFIB4Lab] = useState("");
  const [astPlateletLab, setastPlateletLab] = useState("");
  const laboratoryButtonHandle = () => {
    setLaboratoryButton(!laboratoryButton);
  };
  //Comorbidities Parameters initializer
  const [comorbiditiesButton, setComorbiditiesButton] = useState(true);
  const [diabetesComorbidities, setComorbiditiesDiabetes] = useState("");
  const [hypertensionComorbidities, setComorbiditiesHypertension] =
    useState("");
  const [dyslipidemiaComorbidities, setComorbiditiesDyslipidemia] =
    useState("");
  const [coronaryComorbidities, setComorbiditiesCoronary] = useState("");
  const [peripheralComorbidities, setComorbiditiesPeripheral] = useState("");
  const [hivComorbidities, setComorbiditiesHiv] = useState("");
  const [diabetesAfter, setDiabetesAfter] = useState("");
  const [hypertensionAfter, setHypertensionAfter] = useState("");
  const [dysliAfter, setDyslipidemiaAfter] = useState("");
  const [coronaryAfter, setCoronaryAfter] = useState("");
  const [peripheralAfter, setPeripheralAfter] = useState("");
  const [hivAfter, setHIVAfter] = useState("");
  const [yesDiabetesInput, setYesDiabetesInput] = useState("");
  const [yesHyperTensionInput, setYesHyperTensionInput] = useState("");
  const [yesDyslipidemiaInput, setYesDyslipidemiaInput] = useState("");
  const [yesCoronaryInput, setYesCoronaryInput] = useState("");
  const [yesPeripheralInput, setYesPeripheralInput] = useState("");
  const [yesHivInput, setYesHivInput] = useState("");
  const [nonLiverCancer, setNonLiverCancer] = useState("");
  const [yesLocationSiteValue, setYesLocationSiteValue] = useState("");
  const [yesStageValue, setYesStageValue] = useState("");
  const [yesYearOfDiagnosis, setYesYearOfdiagnosis] = useState("");
  const [alcoholConsumptionValue, setAlcoholConsumptionValue] = useState("");
  const [alcoholConsumptionValueSub, setAlcoholConsumptionValueSub] =
    useState("");

  const comorbiditiesButtonHandle = () => {
    setComorbiditiesButton(!comorbiditiesButton);
  };

  // HCC Diagnosis Information
  const [hccDiagnosisUp, setHccDiagnosisUp] = useState(true);

  const [diagnosisInformationValue, setDiagnosisInformationValue] =
    useState([]);
  const [hccDiagnosisInfoValueOtherSpecify, sethccDiagnosisInfo] = useState("");
  const [typeOfImagine, setTypeOfImagine] = useState("");
  const [typeOfImagineText, setTypeOfImagineText] = useState();
  const [hccDiagnosisImagingUnkown, sethccDiagnosisImaging] = useState([]);
  const [hccDiagnosisTissueUnknown, sethccDiagnosisTissueUnknown] = useState(
    []
  );
  const [hccDiagnosisImagingDate, sethccDiagnosisImagingDate] = useState("");
  const [hccDiagnosisTissueDate, sethccDiagnosisTissueDate] = useState("");
  const handleDiagnosisImagingUnknown = (values) => {
    let updatedValues;
    if (hccDiagnosisImagingUnkown.includes(values)) {
      updatedValues = hccDiagnosisImagingUnkown.filter(
        (item) => item !== values
      );
    } else {
      updatedValues = [...hccDiagnosisImagingUnkown, values];
    }
    sethccDiagnosisImaging(updatedValues);
    sethccDiagnosisImagingDate("");
  };

  const handleDiagnosisTissueUnknown = (values) => {
    let updatedValues;
    if (hccDiagnosisTissueUnknown.includes(values)) {
      updatedValues = hccDiagnosisTissueUnknown.filter(
        (item) => item !== values
      );
    } else {
      updatedValues = [...hccDiagnosisTissueUnknown, values];
    }
    sethccDiagnosisTissueUnknown(updatedValues);
    sethccDiagnosisTissueDate("");
  };
  const hccDiagnosisInfoHandle = () => {
    setHccDiagnosisUp(!hccDiagnosisUp);
  };

  //HCC Staging initializer
  const [HCCStagingUp, setHCCStagingUp] = useState(true);
  const [largeTurmorValue, setLargeTurmorValue] = useState("");
  const [tPrimaryValue, setTPrimaryValue] = useState("");
  const [nRegionalValue, setNRegionalValue] = useState("");
  const [mRegionalValue, setMRegionalValue] = useState("");
  const [anatomicStageTNM, setAnatomicStageTNM] = useState("");
  const [tumorDiffValue, setTumorDiffValue] = useState("");
  const [ecogperformace, setEcogPerformace] = useState("");
  const [tumorStageValue, setTumorStageValue] = useState("");
  const [typeOfVascular, setTypeOfVascular] = useState("");
  const [microvascularInvasion, setMicrovascularInvasion] = useState("");
  const [tumorWithinMilan, setTumorWithinMilan] = useState("");
  const [childPughClassfication, setChildPughClassfication] = useState("");
  const [barcelonaClinic, setBarcelonaClinic] = useState("");
  const HCCStagingHandle = () => {
    setHCCStagingUp(!HCCStagingUp);
  };

  //Chronic Liver (CLD) initializer
  const [chronicButton, setChronicButton] = useState(true);
  const [fattyLiverCLD, setFattyLiverCLD] = useState("");
  const [fattyLiverRadioLast, setFattyLiverRadioLast] = useState("");
  const [fattyLiverDiagnosticFreeText, setFattyLiverDiagnosticFreeText] =
    useState("");
  const [cirrhosisStatusValue, setCirrhosisStatusValue] = useState("");
  const [mittalCriteriaValue, setMittalCriteriaValue] = useState("");
  const [underlyingEtiologyValue, setUnderlyingEtiologyValue] = useState("");
  // Multi selection
  const handleUnderlyingEtiology = (values) => {
    let updatedValues;
    if (underlyingEtiologyValue.includes(values)) {
      updatedValues = underlyingEtiologyValue.filter((item) => item !== values);
    } else {
      updatedValues = [...underlyingEtiologyValue, values];
    }
    setUnderlyingEtiologyValue(updatedValues);
  };
  const [etiologyCirrhosisFreeValue, setEtiologyCirrhosisFreeValue] =
    useState();
  const [complicationCLD, setComplicationCLD] = useState("");
  // Multi Selection
  const handleComplicationCLD = (values) => {
    let updatedValues;
    if (complicationCLD.includes(values)) {
      updatedValues = complicationCLD.filter((item) => item !== values);
    } else {
      updatedValues = [...complicationCLD, values];
    }
    setComplicationCLD(updatedValues);
  };
  const chronicButtonHandle = () => {
    setChronicButton(!chronicButton);
  };

  //HCC Outcome Initializers
  const [hccOutcome, setHccOutComeButton] = useState(true);
  const [hccOutcomeValue, setHccOutcomeValue] = useState("");
  // Multi selection
  const handleHccOutComeValue = (values) => {
    let updatedValues;
    if (hccOutcomeValue.includes(values)) {
      updatedValues = hccOutcomeValue.filter((item) => item !== values);
      if (values === "Other (specify in freetext)") {
        // setTreamentModalitiesHCC("");
      }
      if (values === "Resection") {
        setResectionPerformed("");
      }
      if (values === "Liver transplantation") {
        setLiverTransplantValue("");
      }
    } else {
      updatedValues = [...hccOutcomeValue, values];
    }
    setHccOutcomeValue(updatedValues);
  };
  const [treamentModalitiesHCC, setTreamentModalitiesHCC] = useState("");
  const [resectionPerformed, setResectionPerformed] = useState("");
  const [liverTransplantValue, setLiverTransplantValue] = useState("");
  const [recurrenceValue, setRecurrenceValue] = useState("");
  const [selectedDateOfFirstRecurrence, setSelectedDateOfFirstRecurrence] =
    useState("");
  const [survivalStatusValue, setSurvivalStatusValue] = useState("");
  const [selectedDateOfDeath, setSelectedDateOfDeath] = useState("");
  const [dateOfDeathUnknown, setDateOfDeathUnkown] = useState("");
  const [selectedDateOfLastContact, setSelectedDateOfLastContact] =
    useState("");
  const [lastContactUnknown, setLastContactUnknown] = useState();
  const [selectedDateOfRecurrenceFree, setSelectedDateOfRecurrenceFree] =
    useState("");
  const [selectedDateOfOverallSurvival, setSelectedDateOfOverallSurvival] =
    useState("");
  const hccOutcomeButtonHandle = () => {
    setHccOutComeButton(!hccOutcome);
  };

  //Screening Questions initializers
  const [screenQuestion, setScreenQes] = useState(true);
  const [screeningQuestion, setScreeningQuestionValue] = useState("");
  const [screeningQuestionNa, setScreeningQuestionNa] = useState("");
  const [screening2Years, setScreening2Years] = useState("");
  const [screening1Year, setScreening1Year] = useState("");
  const [methodOfScreening, setMethodOfScreening] = useState("");
  const [methodOfScreeningTxt, setMethodOfScreeningTxt] = useState("");
  const screeningQesButtonHandle = () => {
    setScreenQes(!screenQuestion);
  };

  //HIV Specific initializer
  const [hivSpecificButton, setHivSpecific] = useState(true);
  const [historyHIV, setHistoryHiv] = useState("");
  const [yearOfHIVHCC, setYearOfHIVHCC] = useState("");
  const [dateOfHIVDurationFrom, setDateOfHIVDurationFrom] = useState("");
  const [dateOfHIVDurationTo, setDateOfHIVDurationTo] = useState("");
  const [belowRadioHCC, setBelowRadioHCC] = useState([]);
  const [belowLimitDefect, setBelowLimitDefect] = useState("");
  const [hivRNAHCC, setHIVRNAHCC] = useState("");
  const [hivCD4, setHIVCD4] = useState();
  const [hivAbsoluteCD4, setHivAbsoluteCD4] = useState("");
  const [hivCD4CellCount, setHIVCD4CellCount] = useState("");
  const [hivInitialHIV1, setHivInitialHIV1] = useState("");
  const [maximumHIVRNA, setMaximumHIVRNA] = useState("");

  const [hivCD4Nav, setHIVCD4Nav] = useState("");
  const [hivAbsoluteCD4Nav, setHivAbsoluteCD4Nav] = useState("");
  const [hivCD4CellCountNav, setHIVCD4CellCountNav] = useState("");
  const [hivInitialHIV1Nav, setHivInitialHIV1Nav] = useState("");
  const [maximumHIVRNANav, setMaximumHIVRNANav] = useState("");
  const hivButtonHandle = () => {
    setHivSpecific(!hivSpecificButton);
  };

  // hepatitisCVirusButton initializer
  const [hepatitisCVirusButton, setHepatitisCVirusButton] = useState(true);
  const [isDateHCVDiagnosis, setIsDateHCVDiagnosis] = useState("");
  const [dateOfHCVCVirus, setDateOfHCVCVirus] = useState("");
  const [isHCViralCVirus, setIsHCViralCVirus] = useState("");
  const [HCVviralTimeOfHCCDiagnosis, setHCVviralTimeOfHCCDiagnosis] =
    useState("");
  const [hcvGenotype, setHCVGenotype] = useState("");
  // Multi-selection
  const handleHCVGenotypeMultiselection = (values) => {
    let updatedValues;
    if (hcvGenotype.includes(values)) {
      updatedValues = hcvGenotype.filter((item) => item !== values);
    } else {
      updatedValues = [...hcvGenotype, values];
    }
    setHCVGenotype(updatedValues);
  };
  // // console.log(hcvGenotype);
  const [wasHCVReceivedBeforeAfter, setWasHCVReceivedBeforeAfter] =
    useState("");
  const [hcvTreatmentCVirus, setHcvTreatmentCVirus] = useState("");
  // Multi-selection
  const handleHCVTreatmentCVirus = (values) => {
    let updatedValues;
    if (hcvTreatmentCVirus.includes(values)) {
      updatedValues = hcvTreatmentCVirus.filter((item) => item !== values);
    } else {
      updatedValues = [...hcvTreatmentCVirus, values];
    }
    setHcvTreatmentCVirus(updatedValues);
  };
  // // console.log(hcvTreatmentCVirus);
  const [hcvTreatedYear, setHCVTreatedYear] = useState("");
  const [hcvViralLoadAfterTreatment, setHcvViralLoadAfterTreatment] =
    useState("");
  const [hcvPostTreatment, setHcvPostTreatment] = useState("");
  const hepatitisCVirusButtonHandle = () => {
    setHepatitisCVirusButton(!hepatitisCVirusButton);
  };
  const [sustainedHCV, setSustainedHcv] = useState("");
  const [yearSVRHCV, setYearSVRHCV] = useState("");

  // hepatitisBVirusButton initializer
  const [hepatitisBVirusButton, sethepatitisBVirusButton] = useState(true);
  const [isDateHBVDiagnosis, setIsDateHBVDiagnosis] = useState("");
  const [dateOfHBVBVirus, setDateOfHBVBVirus] = useState("");
  const [isHBViralBVirus, setIsHBViralBVirus] = useState("");
  const [HBVviralTimeOfHCCDiagnosis, setHBVviralTimeOfHCCDiagnosis] =
    useState("");
  const [wasHBVReceivedBeforeAfter, setWasHBVReceivedBeforeAfter] =
    useState("");
  const [hcvTreatmentBVirus, setHcvTreatmentBVirus] = useState("");
  // Multi-selection
  const handleHCVTreatmentBVirus = (values) => {
    let updatedValues;
    if (hcvTreatmentBVirus.includes(values)) {
      updatedValues = hcvTreatmentBVirus.filter((item) => item !== values);
    } else {
      updatedValues = [...hcvTreatmentBVirus, values];
    }
    setHcvTreatmentBVirus(updatedValues);
  };
  // // console.log(hcvTreatmentBVirus);
  const [hbvViralLoadAfterTreatment, setHbvViralLoadAfterTreatment] =
    useState("");
  const [hbvPostTreatment, setHbvPostTreatment] = useState("");
  const [dateOfHBVTreatmentYear, setDateOfHBVTreatmentYear] = useState("");
  const hepatitisBVirusButtonHandle = () => {
    sethepatitisBVirusButton(!hepatitisBVirusButton);
  };
  // log initializer
  const [logUp, setLogUp] = useState(true);

  const [createdBy, setCreatedBy] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [changedBy, setChangedBy] = useState("");
  const [changedOn, setChangedOn] = useState("");

  function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return (
      year +
      "-" +
      month +
      "-" +
      day
    );
  }

  useEffect(() => {
    const token = Cookies.get('tkn');
    if (token) {
      const data = jwtDecode(token);
      // console.log('dataaa', data);
      if (data) {
        setCreatedBy(data?.sub);
        setChangedBy(data?.sub);
        setCreatedOn(new Date());
        setChangedOn(new Date());
      }
    }
  }, []);


  const logUpHandle = () => {
    setLogUp(!logUp);
  };

  // Unknown thing
  const [selectedDate, setSelectedDate] = useState(null);
  const handleChange = (date) => {
    setSelectedDate(date);
    // console.log("Selected Date:", moment(date).format("DD-MMM-YYYY"));
  };
  const tkn = Cookies.get("tkn");
  if (tkn === undefined) {
    return navigate("/login");
  }

  // const checkCondition = (type, valid) => {
  //   let isValid = type === 'Applicable' ? true : (modelEndStageLab !== 'Applicable' && modelEndStageLab !== '') ? true : false;
  //   return valid === false ? false : isValid; 
  // };

  // const calculateMELD = (type, valid) => {
  //   if(checkCondition(type, valid)) {
  //     const tmpCreatinineValue = (creatinineValue !== "" ? creatinineValue < 1 ? 1 : creatinineValue > 4 ? 4 : creatinineValue : 0);
  //     const tmpBilirubinValue = (bilirubinValue !== "" ? bilirubinValue < 1 ? 1 : bilirubinValue : 0);
  //     const tmpInternationalValue = (internationalValue !== "" ? internationalValue < 1 ? 1 : internationalValue : 0);
  //     return (
  //       (0.957 * Math.log(tmpCreatinineValue !== "" ? tmpCreatinineValue : 0) +
  //         0.378 * Math.log(tmpBilirubinValue !== "" ? tmpBilirubinValue : 0) +
  //         1.12 * Math.log(tmpInternationalValue !== "" ? tmpInternationalValue : 0) +
  //         0.643) *
  //       10
  //     );
      
  //   }
  // };

  // calculateMELD
  const calculatedScores = (type, valid) => {
    let isValid = type === 'Applicable' ? true : (modelEndStageLab !== 'Applicable' && modelEndStageLab !== '') ? true : false;
    isValid = valid === false ? false : isValid;  
    if (isValid) {
      const calculateMELD = () => {
        const tmpCreatinineValue = (creatinineValue !== "" ? creatinineValue < 1 ? 1 : creatinineValue > 4 ? 4 : creatinineValue : 0);
        const tmpBilirubinValue = (bilirubinValue !== "" ? bilirubinValue < 1 ? 1 : bilirubinValue : 0);
        const tmpInternationalValue = (internationalValue !== "" ? internationalValue < 1 ? 1 : internationalValue : 0);
        return (
          (0.957 * Math.log(tmpCreatinineValue !== "" ? tmpCreatinineValue : 0) +
            0.378 * Math.log(tmpBilirubinValue !== "" ? tmpBilirubinValue : 0) +
            1.12 * Math.log(tmpInternationalValue !== "" ? tmpInternationalValue : 0) +
            0.643) *
          10
        );
      };
      let meldss = calculateMELD();
      let melds = Number(meldss.toFixed(2));
      setMeldScoreLab(melds);
      // MELDNA
      const calculateMELDNa = () => {
        const tmpSodiumValue = (sodiumValue !== "" ? sodiumValue < 125 ? 125 : sodiumValue > 137 ? 137 : sodiumValue : 0);
        return (
          melds +
          1.32 * (137 - tmpSodiumValue) -
          0.033 * melds * (137 - tmpSodiumValue)
        );
      };
      if(sodiumValue !== "") {
        let meldsNa = calculateMELDNa();
        setModelEndStageTextArea(meldsNa.toFixed(2));
      }
      // AST
      const calculateAST = () => {
        return (((aspartateValue * 100) / aspartateTo) * 1) / platelatesValue;
      };
      let astss = calculateAST().toFixed(3);

      setastPlateletLab(astss);
      let totalYear = studyDate.slice(0, 4) - subjectYear;
      // console.log(totalYear, "Yearsssss");
      // FIB4
      const calculateFIB4 = () => {
        return (
          (((totalYear * aspartateValue) /
            (platelatesValue * Math.sqrt(alanineValue))) *
            100) /
          100
        );
      };
      let fib4s = calculateFIB4();
      // // console.log(fib4s);
      setFIB4Lab(fib4s.toFixed(2));
    } else {
      setModelEndStageTextArea("");
      setMeldScoreLab("");
      setFIB4Lab("");
      setastPlateletLab("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="bg">
        {/* ============================studyData container========================== */}
        <form onSubmit={handleSubmit}>
          <div className="study-container">
            {/* <p>Record:{count}</p> */}
            <div className="studyData-container">
              <h1 className="study-txt">Study Data</h1>
              <button
                type="button"
                onClick={studyButtonHandle}
                className="study-btn"
              >
                {studyButton ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </button>
            </div>
            <div className={studyButton ? "study-data" : ""}>
              <Fade>
                <div className="card p-3">
                  <div className="row">
                    <div className="col-sm-12">
                      <label className="label-txt" htmlFor="study-title">
                        Study Title
                      </label>
                      <textarea
                        onKeyDown={handleKeyPress}
                        value={studyTitle}
                        onChange={(e) => setStudyTitle(e.target.value)}
                        id="study-title"
                        className="form-control"
                        type="text"
                        disabled
                      ></textarea>
                    </div>
                    {/* <div className="col-3">
                      <label className="label-txt" htmlFor="study-title">
                        Study Title
                      </label>
                      <Form.Select required onChange={(e) => setStudyTitle(e.target.value)}>
                        {studyTitles && studyTitles.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                    </div> */}
                  </div>
                  <div className="row mt-4">
                    <div className="col-sm-4">
                      <label className="label-txt" htmlFor="project-no">
                        Project No
                      </label>
                      {/* <Form.Select required onChange={(e) => setProjectNo(e.target.value)}>
                        {studyProjects && studyProjects.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select> */}
                      <input
                        onKeyDown={handleKeyPress}
                        maxLength={10}
                        value={projectNo}
                        onChange={(e) => setProjectNo(e.target.value)}
                        id="project-no"
                        className="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                    <div className="col-sm-4">
                      <label className="label-txt" htmlFor="study-title">
                        Study Date
                      </label>
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        className="form-control"
                        value={studyDate}
                        // value={currentDate}
                        dateFormat="dd/MMM/yyyy"
                        onChange={(e) => {
                          const inputDate = e.target.value;
                          const [year, month, day] = inputDate.split("-");
                          const limitedYear = year.slice(0, 4);
                          const formattedDate = `${limitedYear}-${month}-${day}`;
                          setStudyDate(formattedDate);
                        }}
                        type="date"
                      />
                      {/* <DatePicker
                        wrapperClassName='w-full'
                        selected={studyDate}
                        onChange={date => setStudyDate(date)}
                        startDate={studyDate}
                        // endDate={endDate}
                        dateFormat={'dd/MMM/yyyy'}
                        className="form-control date"
                        placeholderText="DD/MMM/YYYY"
                      /> */}
                    </div>
                    <div className="col-sm-4">
                      <label className="label-txt" htmlFor="site-id">
                        Site ID / Name
                      </label>
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        maxLength={3}
                        readOnly
                        disabled
                        value={siteId}
                        onChange={(e) => setSiteId(e.target.value)}
                        id="site-id"
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="container-width">
                  <label className="label-txt" htmlFor="study-title">
                    Study Title
                  </label>
                  <input
onKeyDown={handleKeyPress}
                    value={studyTitle}
                    onChange={(e) => setStudyTitle(e.target.value)}
                    id="study-title"
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label className="label-txt" htmlFor="project-no">
                      Project No
                    </label>
                    <input
onKeyDown={handleKeyPress}
                      maxLength={10}
                      value={projectNo}
                      onChange={(e) => setProjectNo(e.target.value)}
                      id="project-no"
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <div className="container-width" style={{ marginLeft: 15 }}>
                    <input
onKeyDown={handleKeyPress}
                      className="form-control"
                      value={studyDate}
                      onChange={(e) => {
                        const inputDate = e.target.value;
                        const [year, month, day] = inputDate.split("-");
                        const limitedYear = year.slice(0, 4);
                        const formattedDate = `${limitedYear}-${month}-${day}`;
                        setStudyDate(formattedDate);
                      }}
                      type="date"
                    />
                  </div>
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label className="label-txt" htmlFor="site-id">
                      Site ID / Name
                    </label>
                    <input
onKeyDown={handleKeyPress}
                      maxLength={3}
                      value={siteId}
                      onChange={(e) => setSiteId(e.target.value)}
                      id="site-id"
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="container-width"></div>
                </div> */}
              </Fade>
            </div>
          </div>

          {/*================================== subjectData container======================== */}
          <div>
            <div className="study-container">
              <div className="studyData-container">
                <h1 className="study-txt">Subject Data</h1>
                <button
                  onClick={subjectButtonHandle}
                  className="study-btn"
                  type="button"
                >
                  {subjectButton ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </button>
              </div>
              <div className={subjectButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="row">
                      <div className="col-sm-2 col-lg-3">
                        <label className="label-txt" htmlFor="subject-id">
                          Subject ID
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          value={subjectId}
                          required
                          onChange={(e) => setSubjectId(e.target.value)}
                          readOnly
                          disabled
                          id="subject-id"
                          className="form-control"
                          type="text"
                        />
                      </div>
                      <div className="col-sm-2 col-lg-3">
                        <label className="label-txt" htmlFor="subject-counter">
                          Subject Counter
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          disabled
                          value={count}
                          readOnly
                          onChange={(e) => setSubjectCounter(e.target.value)}
                          type="text"
                          id="subject-counter"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: 25 }}>
                      <div className="col-sm-3">
                        <label className="label-txt" htmlFor="subject-counter">
                          Year of Birth <br /> (if available)
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          disabled={subjectUnknown[0] === "Unknown"}
                          placeholder="YYYY"
                          type="text"
                          // min={1900}
                          // max={2024}
                          value={subjectYear}
                          className="form-control"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setSubjectYear(e.target.value);
                            }
                          }}
                        />
                      </div>
                      <div className="col-sm-2">
                        <label className="label-txt" htmlFor="subject-counter" style={{ marginLeft: 35, marginTop: 35 }}>
                          OR
                        </label>
                      </div>
                      <div className="col-sm-3">
                        <Form.Check
                          type="checkbox"
                          style={{ marginTop: 35 }}
                          label="Unknown"
                          checked={subjectUnknown.includes("Unknown")}
                          onChange={() => {
                            if (subjectUnknown === "Unknown") {
                              setSubjectYear("");
                            }
                            handleSubjectUnknown("Unknown");
                          }}
                        />
                      </div>
                      <div className="col-sm-5" style={{ marginTop: 20 }}>
                        <label className="label-txt" htmlFor="gender">
                          Sex of the patient
                        </label>
                        <div style={{ display: 'inline-flex' }}>
                          <Form.Check
                            type="radio"
                            label="Male"
                            required
                            value={'Male'}
                            checked={subjectGender === "Male"}
                            onChange={(e) => setSubjectGender(e.target.value)}
                          />
                          <Form.Check
                            type="radio"
                            label="Female"
                            required
                            value={'Female'}
                            style={{ marginLeft: 5 }}
                            checked={subjectGender === "Female"}
                            onChange={(e) => setSubjectGender(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-7" style={{ marginTop: 20 }}>
                        <label className="label-txt" htmlFor="gender">
                          Ethnicity
                        </label>
                        <div style={{ display: 'inline-flex', width: '100%' }}>
                          <div className="col-sm-3">
                            <Form.Check
                              type="radio"
                              label="Mexican"
                              value={'Mexican'}
                              checked={otherCheck === "Mexican"}
                              onChange={(e) => {
                                const s = e.target.value;
                                if (s === "Others") {
                                  setSubjectOtherText("");
                                } else {
                                  setSubjectOtherText("");
                                }

                                setOtherCheck(s);
                              }}
                            />
                          </div>
                          <div className="col-sm-3">
                            <Form.Check
                              type="radio"
                              label="Others"
                              value={'Others'}
                              checked={otherCheck === "Others"}
                              onChange={(e) => setOtherCheck(e.target.value)}
                            />
                          </div>
                          <div className="col-sm-6">
                            {
                              otherCheck === "Others" && (
                                <>
                                  <textarea
                                    onKeyDown={handleKeyPress}
                                    maxLength={15}
                                    rows={1}
                                    required={otherCheck === "Others"}
                                    value={subjectOtherText}
                                    onChange={(e) => setSubjectOtherText(e.target.value)}
                                    disabled={otherCheck !== "Others"}
                                    className="form-control"
                                  ></textarea>
                                </>
                              )
                            }
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label className="label-txt">Place of Birth(City)</label>
                        <input
                          onKeyDown={handleKeyPress}
                          maxLength={30}
                          required
                          value={placeOfBirthCity}
                          onChange={(e) => setPlaceOfBirthCity(e.target.value)}
                          id="place-birth"
                          className="form-control"
                          type="text"
                        />
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label className="label-txt">Place of Birth(State)</label>
                        <input
                          onKeyDown={handleKeyPress}
                          maxLength={30}
                          onChange={(e) => setPlaceOfBirthState(e.target.value)}
                          value={placeOfBirthState}
                          required
                          id="place-birth"
                          className="form-control"
                          type="text"
                        />
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label className="label-txt">
                          Residence City
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          maxLength={30}
                          id="residency-city"
                          required
                          value={residencyCity}
                          onChange={(e) => setResidencyCity(e.target.value)}
                          className="form-control"
                          type="text"
                        />
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label className="label-txt">
                          Residence State
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          maxLength={30}
                          required
                          onChange={(e) => setResidencyState(e.target.value)}
                          value={residencyState}
                          id="residency-state"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
          {/*============================= BaseLine Characteristics container ===========================*/}
          <div>
            <div className="study-container">
              <div className="studyData-container">
                <h1 className="study-txt">Baseline Characteristics </h1>
                <button
                  className="study-btn"
                  onClick={baseLineCharacterButtonHandle}
                  type="button"
                >
                  {baseLineButton ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </button>
              </div>
              <div className={baseLineButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="row">
                      <div className="col-sm-3">
                        <label className="label-txt">Date of HCC Diagnosis</label>
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          type="date"
                          value={dateOfHcc}
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            setDateOfHcc(formattedDate);
                          }}
                          disabled={baseLineIfDateRadio[0] === "Unknown"}
                          className="form-control"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={dateOfHcc}
                          onChange={date => {
                            console.log(date);
                            setDateOfHcc(date);
                          }}
                          selectsStart
                          startDate={dateOfHcc}
                          dateFormat={'dd/MMM/yyyy'}
                          className="form-control date"
                          disabled={baseLineIfDateRadio[0] === "Unknown"}
                          placeholderText="DD/MMM/YYYY"
                        /> */}
                      </div>
                      <div className="col-sm-1">
                        <label className="label-txt" htmlFor="subject-counter" style={{ marginLeft: 35, marginTop: 35 }}>
                          OR
                        </label>
                      </div>
                      <div className="col-sm-3">
                        <Form.Check
                          type="checkbox"
                          label="Date Not Available"
                          checked={baseLineIfDateRadio.includes("Unknown")}
                          onChange={() => handleBaseLineRadio("Unknown")}
                          style={{ marginLeft: 15, marginTop: 35 }}
                        />
                      </div>
                      <div className="col-sm-5">
                        <label className="label-txt-baseLine">
                          If date not available, mention the approximate year
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={baseLineIfDateRadio[0] !== "Unknown"}
                          value={baseLineIfDate}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setBaseLineIfDate(e.target.value);
                            }
                          }}
                          className="form-control"
                          type="text"
                          placeholder="YYYY"
                          style={{ width: 150 }}
                        />
                      </div>
                      <div className="col-sm-4" style={{ marginTop: 20 }}>
                        <label className="label-txt">Age at HCC Diagnosis</label>
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          placeholder="Age"
                          // maxLength={3}
                          value={baseLineAgeOfHcc}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,3}$/.test(inputValue)) {
                              setBaseLineAgeOfHcc(e.target.value);
                            }
                          }}
                          className="form-control"
                          type="text"
                          style={{ width: 150 }}
                        />
                        <p className="alert">
                          {(parseInt(baseLineAgeOfHcc) < 18 ||
                            parseInt(baseLineAgeOfHcc) > 100) &&
                            "Age not in between 18 and 100"}
                        </p>
                      </div>
                      <div className="row" style={{ marginTop: '-30px' }}>
                        <div className="col-sm-3">
                          <label className="label-txt">Height(in cm)</label>
                          <input
                            onKeyDown={handleKeyPress}
                            placeholder="Height"
                            required
                            value={baseLineHeight}
                            onChange={(e) => {
                              const value = e.target.value;
                              const reg = /^\d{1,3}(\.\d{0,1})?$/;
                              if (reg.test(value) || value === "") {
                                setBaseLineHeight(e.target.value);
                              }
                            }}
                            className="form-control"
                            type="text"
                            style={{ width: 150 }}
                          />
                        </div>
                        <div className="col-sm-7">
                          <label className="label-txt">
                            Weight in KG <span>(closest to the date of HCC diagnosis)</span>
                          </label>
                          <input
                            onKeyDown={handleKeyPress}
                            placeholder="Weight"
                            required
                            value={weightHggBaseLine}
                            onChange={(e) => {
                              const value = e.target.value;
                              const reg = /^\d{1,3}(\.\d{0,1})?$/;
                              if (reg.test(value) || value === "") {
                                setWeightHggBaseLine(e.target.value);
                              }
                            }}
                            className="form-control"
                            type="text"
                            style={{ width: 150 }}
                          />
                        </div>
                        <div className="col-sm-2">
                          <label className="label-txt">BMI in kg/m2</label>
                          <input
                            onKeyDown={handleKeyPress}
                            placeholder="BMI"
                            value={bmiBaseLine}
                            readOnly
                            // onChange={(e) => setBmiBaseLine(e.target.value)}
                            className="form-control"
                            type="number"
                          />
                        </div>
                      </div>
                      {/* <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-3">
                          <label className="label-txt">BMI in kg/m2</label>
                          <input
                            onKeyDown={handleKeyPress}
                            placeholder="Enter the Body Mass Index"
                            value={bmiBaseLine}
                            readOnly
                            // onChange={(e) => setBmiBaseLine(e.target.value)}
                            className="form-control"
                            type="number"
                          />
                        </div>
                      </div> */}
                      <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-6">
                          <label className="label-txt">Type of Insurance</label>
                          <div style={{ display: 'inline-flex' }}>
                            <Form.Check
                              type="radio"
                              label="Private"
                              checked={insuranceValue === "Private"}
                              value={"Private"}
                              onChange={(e) => {
                                let s = e.target.value;
                                if (s === "Other") {
                                  setInsuranceValueOtherBaseline("");
                                } else {
                                  setInsuranceValueOtherBaseline("");
                                }
                                setInsuranceValue(s);
                              }}
                            />
                            <Form.Check
                              type="radio"
                              label="Public"
                              style={{ marginLeft: 5 }}
                              checked={insuranceValue === "Public"}
                              value={"Public"}
                              onChange={(e) => {
                                let s = e.target.value;
                                if (s === "Other") {
                                  setInsuranceValueOtherBaseline("");
                                } else {
                                  setInsuranceValueOtherBaseline("");
                                }
                                setInsuranceValue(s);
                              }}
                            />
                            <Form.Check
                              type="radio"
                              label="Other"
                              style={{ marginLeft: 5,marginRight:"5px" }}
                              checked={insuranceValue === "Other"}
                              value={"Other"}
                              onChange={(e) => setInsuranceValue(e.target.value)}
                            />
                            {
                              insuranceValue === "Other" && (
                                <textarea
                                  onKeyDown={handleKeyPress}
                                  maxLength={40}
                                  value={insuraceValueOtherBaseline}
                                  onChange={(e) =>
                                    setInsuranceValueOtherBaseline(e.target.value)
                                  }
                                  disabled={insuranceValue !== "Other"}
                                  className="form-control"
                                ></textarea>
                              )
                            }
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <label className="label-txt">Insurance Details</label>
                          <textarea
                            onKeyDown={handleKeyPress}
                            disabled={!insuranceValue}
                            maxLength={200}
                            placeholder="Insurance Details"
                            rows={1}
                            value={insuraceDetailsBaseLine}
                            onChange={(e) =>
                              setInsuranceDetailsBaseLine(e.target.value)
                            }
                            className="form-control"
                            type="text"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
          {/*================================ Laboratory Parameters container============================= */}
          <div>
            <div className="study-container">
              <div className="studyData-container">
                <h1 className="study-txt">
                  Laboratory Parameters most recent and within 6 months of the HCC
                  diagnosis{" "}
                </h1>
                <button
                  onClick={laboratoryButtonHandle}
                  className="study-btn"
                  type="button"
                >
                  {laboratoryButton ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </button>
              </div>
              <div className={laboratoryButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="row">
                      <div className="col-sm-12">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="col-sm-5">Parameters</th>
                              <th className="col-sm-1">Reference Range(Lower Limit)</th>
                              <th className="col-sm-1">Reference Range(Upper Limit)</th>
                              <th className="col-sm-1">Value</th>
                              <th className="col-sm-1">Units</th>
                              <th className="col-sm-3">Unknown</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="col-sm-5">Hemoglobin A1C (HbA1c)</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  id="alanine-from"
                                  required
                                  style={{ height: 'fit-content' }}
                                  disabled={hemoGlobinUnknown[0] === "Unknown"}
                                  value={hemoGlobinFrom}
                                  onChange={(e) => setHemoGlobinFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={hemoGlobinTo}
                                  required
                                  disabled={hemoGlobinUnknown[0] === "Unknown"}
                                  onChange={(e) => setHemoGlobinTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={hemoGlobinValue}
                                  required
                                  disabled={hemoGlobinUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setHemoglobinValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(hemoGlobinValue) <
                                    parseFloat(hemoGlobinFrom) ||
                                    parseFloat(hemoGlobinValue) >
                                    parseFloat(hemoGlobinTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                %
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  // value={'sDesign'}
                                  checked={hemoGlobinUnknown.includes("Unknown")}
                                  onChange={() => handleglobin("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5"><span>Alanine Aminotransferase(ALT)</span></td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  id="alanine-from"
                                  required
                                  style={{ height: 'fit-content' }}
                                  value={alanineFrom}
                                  disabled={alanineUnknown[0] === "Unknown"}
                                  onChange={(e) => setAlanineFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  //required
                                  id="alaninie-to"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={alanineTo}
                                  required
                                  disabled={alanineUnknown[0] === "Unknown"}
                                  onChange={(e) => setAlanineTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={alanineValue}
                                  disabled={alanineUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setAlanineValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true)}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(alanineValue) <
                                    parseFloat(alanineFrom) ||
                                    parseFloat(alanineValue) > parseFloat(alanineTo)) &&
                                    "Not in betweeen the range"}
                                </p>
                              </td>
                              <td>
                                Units/L
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={alanineUnknown.includes("Unknown")}
                                  onChange={() => handlealanine("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Aspartate Aminotransferase(AST)</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-from"
                                  style={{ height: 'fit-content' }}
                                  value={aspartateFrom}
                                  disabled={aspartateUnknown[0] === "Unknown"}
                                  onChange={(e) => setAspartateFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={aspartateTo}
                                  disabled={aspartateUnknown[0] === "Unknown"}
                                  onChange={(e) => setAspartateTo(e.target.value)}
                                  onBlur={() => calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={aspartateValue}
                                  disabled={aspartateUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setAspartateValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true)}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(aspartateValue) <
                                    parseFloat(aspartateFrom) ||
                                    parseFloat(aspartateValue) >
                                    parseFloat(aspartateTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                Units/L
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={aspartateUnknown.includes("Unknown")}
                                  onChange={() => handleaspartate("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Total Bilirubin</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-from"
                                  style={{ height: 'fit-content' }}
                                  value={bilirubinFrom}
                                  disabled={bilirubinUnknown[0] === "Unknown"}
                                  onChange={(e) => setBilirubinFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={bilirubinTo}
                                  disabled={bilirubinUnknown[0] === "Unknown"}
                                  onChange={(e) => setBilirubinTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={bilirubinValue}
                                  disabled={bilirubinUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setBilirubinValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true)}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(bilirubinValue) <
                                    parseFloat(bilirubinFrom) ||
                                    parseFloat(bilirubinValue) >
                                    parseFloat(bilirubinTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                mg/dl
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={bilirubinUnknown.includes("Unknown")}
                                  onChange={() => handlebilirubbin("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Alkaline Phosphatase(ALP)</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-from"
                                  style={{ height: 'fit-content' }}
                                  value={alkalineFrom}
                                  disabled={alkalineUnknown[0] === "Unknown"}
                                  onChange={(e) => setAlkalineFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={alkalineTo}
                                  disabled={alkalineUnknown[0] === "Unknown"}
                                  onChange={(e) => setAlkalineTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={alkalineValue}
                                  disabled={alkalineUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setAlkalineValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(alkalineValue) <
                                    parseFloat(alkalineFrom) ||
                                    parseFloat(alkalineValue) >
                                    parseFloat(alkalineTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                Units/L
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={alkalineUnknown.includes("Unknown")}
                                  onChange={() => handlealkaline("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Albumin</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-from"
                                  style={{ height: 'fit-content' }}
                                  value={albuminFrom}
                                  disabled={albuminUnknown[0] === "Unknown"}
                                  onChange={(e) => setAlbuminFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  value={albuminTo}
                                  disabled={albuminUnknown[0] === "Unknown"}
                                  onChange={(e) => setAlbuminTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={albuminValue}
                                  disabled={albuminUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setAlbuminValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(albuminValue) <
                                    parseFloat(albuminFrom) ||
                                    parseFloat(albuminValue) > parseFloat(alanineTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                g/dl
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={albuminUnknown.includes("Unknown")}
                                  onChange={() => handlealbumin("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Platelets</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-from"
                                  style={{ height: 'fit-content' }}
                                  value={platelatesFrom}
                                  disabled={platelatesUnknown[0] === "Unknown"}
                                  onChange={(e) => setPlatelatesFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  value={platelatesTo}
                                  disabled={platelatesUnknown[0] === "Unknown"}
                                  onChange={(e) => setPlatelatesTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={platelatesValue}
                                  disabled={platelatesUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setPlatelatesValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true)}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(platelatesValue) <
                                    parseFloat(platelatesFrom) ||
                                    parseFloat(platelatesValue) >
                                    parseFloat(platelatesTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                k/μl (X 109 /μl)
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={platelatesUnknown.includes("Unknown")}
                                  onChange={() => handleplatelates("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Creatinine</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-from"
                                  style={{ height: 'fit-content' }}
                                  value={creatinineFrom}
                                  disabled={creatinineUnknown[0] === "Unknown"}
                                  onChange={(e) => setCreatinineFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  value={creatinineTo}
                                  disabled={creatinineUnknown[0] === "Unknown"}
                                  onChange={(e) => setCreatinineTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={creatinineValue}
                                  disabled={creatinineUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setCreatinineValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true)}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(creatinineValue) <
                                    parseFloat(creatinineFrom) ||
                                    parseFloat(creatinineValue) >
                                    parseFloat(creatinineTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                mg/dl
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={creatinineUnknown.includes("Unknown")}
                                  onChange={() => handlecreatinine("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Prothrombin Time(PT)</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-from"
                                  style={{ height: 'fit-content' }}
                                  value={prothrombinFrom}
                                  disabled={prothrombinUnknown[0] === "Unknown"}
                                  onChange={(e) => setProthrombinFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  value={prothrombinTo}
                                  disabled={prothrombinUnknown[0] === "Unknown"}
                                  onChange={(e) => setProthrombinTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={prothrombinValue}
                                  disabled={prothrombinUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setProthrombinValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(prothrombinValue) <
                                    parseFloat(prothrombinFrom) ||
                                    parseFloat(prothrombinValue) >
                                    parseFloat(prothrombinTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                Seconds
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={prothrombinUnknown.includes("Unknown")}
                                  onChange={() => handleprothrobin("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">International Normalized Ratio (INR)</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalFrom"
                                  style={{ height: 'fit-content' }}
                                  value={internationalFrom}
                                  disabled={internationalUnknown[0] === "Unknown"}
                                  onChange={(e) => setInternationalFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={internationalTo}
                                  disabled={internationalUnknown[0] === "Unknown"}
                                  onChange={(e) => setinternationalTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={internationalValue}
                                  disabled={internationalUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setInternationalValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true)}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(internationalValue) <
                                    parseFloat(internationalFrom) ||
                                    parseFloat(internationalValue) >
                                    parseFloat(internationalTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                N/A
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={internationalUnknown.includes("Unknown")}
                                  onChange={() => handleinternational("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Alpha-fetoprotein(AFP)</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalFrom"
                                  style={{ height: 'fit-content' }}
                                  value={alphaFrom}
                                  disabled={alphaUnknown[0] === "Unknown"}
                                  onChange={(e) => setAlphaFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={alphaTo}
                                  disabled={alphaUnknown[0] === "Unknown"}
                                  onChange={(e) => setAlphaTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={alphaValue}
                                  disabled={alphaUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setAlphaValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(alphaValue) < parseFloat(alphaFrom) ||
                                    parseFloat(alphaValue) > parseFloat(alanineTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                ng/ml
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={alphaUnknown.includes("Unknown")}
                                  onChange={() => handlealpha("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Sodium (Na)</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalFrom"
                                  style={{ height: 'fit-content' }}
                                  value={sodiumFrom}
                                  disabled={sodiumUnknown[0] === "Unknown"}
                                  onChange={(e) => setSodiumFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={sodiumTo}
                                  disabled={sodiumUnknown[0] === "Unknown"}
                                  onChange={(e) => setSodiumTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={sodiumValue}
                                  disabled={sodiumUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setSodiumValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true)}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(sodiumValue) < parseFloat(sodiumFrom) ||
                                    parseFloat(sodiumValue) > parseFloat(sodiumTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                Mmol/L
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={sodiumUnknown.includes("Unknown")}
                                  onChange={() => handlesodium("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Blood Urea Nitrogen</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalFrom"
                                  style={{ height: 'fit-content' }}
                                  value={bloodUreaFrom}
                                  disabled={bloodUreaUnknown[0] === "Unknown"}
                                  onChange={(e) => setBloodUreaFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={bloodUreaTo}
                                  disabled={bloodUreaUnknown[0] === "Unknown"}
                                  onChange={(e) => setBloodUreaTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={bloodUreaValue}
                                  disabled={bloodUreaUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setBloodUreaValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(bloodUreaValue) <
                                    parseFloat(bloodUreaFrom) ||
                                    parseFloat(bloodUreaValue) >
                                    parseFloat(bloodUreaTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                mg/dl
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={bloodUreaUnknown.includes("Unknown")}
                                  onChange={() => handlebloodurea("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Cholesterol</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalFrom"
                                  style={{ height: 'fit-content' }}
                                  value={cholesterolFrom}
                                  disabled={cholesterolUnknown[0] === "Unknown"}
                                  onChange={(e) => setCholesterolFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={cholesterolTo}
                                  disabled={cholesterolUnknown[0] === "Unknown"}
                                  onChange={(e) => setCholesterolTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={cholesterolValue}
                                  disabled={cholesterolUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setCholesterolValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(cholesterolValue) <
                                    parseFloat(cholesterolFrom) ||
                                    parseFloat(cholesterolValue) >
                                    parseFloat(cholesterolTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                mg/dl
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={cholesterolUnknown.includes("Unknown")}
                                  onChange={() => handlecholesterol("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Triglycerides</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalFrom"
                                  style={{ height: 'fit-content' }}
                                  value={triglyceridesFrom}
                                  disabled={triglyceridesUnknown[0] === "Unknown"}
                                  onChange={(e) => setTriglyceridesFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={triglyceridesTo}
                                  disabled={triglyceridesUnknown[0] === "Unknown"}
                                  onChange={(e) => setTriglyceridesTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={triglyceridesValue}
                                  disabled={triglyceridesUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setTriglyceridesValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(triglyceridesValue) <
                                    parseFloat(triglyceridesFrom) ||
                                    parseFloat(triglyceridesValue) >
                                    parseFloat(triglyceridesTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                mg/dl
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={triglyceridesUnknown.includes("Unknown")}
                                  onChange={() => handletriglycerides("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">High Density Lipo-proteins (HDL)</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalFrom"
                                  style={{ height: 'fit-content' }}
                                  value={highDenistyFrom}
                                  disabled={highDensityUnknown[0] === "Unknown"}
                                  onChange={(e) => setHighDenistyFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={highDensityTo}
                                  disabled={highDensityUnknown[0] === "Unknown"}
                                  onChange={(e) => setHighDensityTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={highDensityValue}
                                  disabled={highDensityUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setHighDensityValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(highDensityValue) <
                                    parseFloat(highDenistyFrom) ||
                                    parseFloat(highDensityValue) >
                                    parseFloat(highDensityTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                mg/dl
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={highDensityUnknown.includes("Unknown")}
                                  onChange={() => handlehighdensity("Unknown")}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Low Density Lipo-proteins(LDL)</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalFrom"
                                  style={{ height: 'fit-content' }}
                                  value={lowDensityFrom}
                                  disabled={lowDensityUnknown[0] === "Unknown"}
                                  onChange={(e) => setLowDensityFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={lowDensityTo}
                                  disabled={lowDensityUnknown[0] === "Unknown"}
                                  onChange={(e) => setLowDensityTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={lowDensityValue}
                                  disabled={lowDensityUnknown[0] === "Unknown"}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setLowDensityValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <p className="alert">
                                  {(parseFloat(lowDensityValue) <
                                    parseFloat(lowDensityFrom) ||
                                    parseFloat(lowDensityValue) >
                                    parseFloat(lowDensityTo)) &&
                                    "Not in between the rane"}
                                </p>
                              </td>
                              <td>
                                mg/dl
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  label="Unknown"
                                  checked={lowDensityUnknown.includes("Unknown")}
                                  onChange={() => handlelowdensity("Unknown")}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="col-sm-12">
                        <label htmlFor="alanine-lab" className="label-txt">
                          Model for End Stage Liver Disease (MELD)Na score for Cirrhosis Patient
                        </label>
                        {/* style={{ display: 'inline-flex', width: '100%' }} */}
                        <div className="row">
                          <div className="col-sm-3">
                            <Form.Check
                              type="radio"
                              label="Applicable"
                              style={{ marginLeft: 5 }}
                              checked={modelEndStageLab === "Applicable"}
                              value={"Applicable"}
                              onChange={(e) => {
                                setModelEndStageLab(e.target.value);
                                // setTimeout(() => {
                                calculatedScores(e.target.value);
                                // }, 1000);
                              }}
                            />
                          </div>
                          <div className="col-sm-3">
                            <Form.Check
                              type="radio"
                              label="Not applicable"
                              style={{ marginLeft: 5 }}
                              checked={modelEndStageLab === "Not applicable"}
                              value={"Not applicable"}
                              onChange={(e) => {
                                const s = e.target.value;
                                if (s === "Applicable") {
                                  setMeldScoreLab("");
                                  setModelEndStageTextArea("");
                                  setFIB4Lab("");
                                  setastPlateletLab("");
                                } else {
                                  setMeldScoreLab("");
                                  setModelEndStageTextArea("");
                                  setFIB4Lab("");
                                  setastPlateletLab("");
                                }
                                setModelEndStageLab(e.target.value);
                                // setTimeout(() => {
                                calculatedScores(e.target.value);
                                // }, 1000);
                              }}
                            />
                          </div>
                          <div className="col-sm-6" style={{ display: 'inline-flex' }}>
                            <label htmlFor="alanine-lab" className="label-txt" style={{ marginLeft: 5 }}>
                              If applicable, SCORE
                            </label>
                            <input
                              onKeyDown={handleKeyPress}
                              readOnly
                              required={modelEndStageLab === "Applicable"}
                              id="model-end-ifapplicable"
                              value={modelEndStageTextArea}
                              // value={meldsNa.toFixed(2)}
                              disabled
                              // ={modelEndStageLab !== "Applicable"}
                              onChange={(e) =>
                                setModelEndStageTextArea(e.target.value)
                              }
                              className="form-control"
                              type="number"
                              style={{ width: 100, marginLeft: 20 }}
                            />

                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label htmlFor="alanine-lab" className="label-txt">
                          MELD score
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          required={modelEndStageLab === "Applicable"}
                          readOnly
                          type="number"
                          id="meld-score-lab"
                          disabled
                          // ={modelEndStageLab !== "Applicable"}
                          value={meldScoreLab}
                          // value={melds}
                          onChange={(e) => {
                            setMeldScoreLab(e.target.value);
                          }}
                          className="form-control"
                          style={{ width: 150 }}
                        />
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label htmlFor="FIB4-lab" className="label-txt">
                          FIB4
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          readOnly
                          required={modelEndStageLab === "Applicable"}
                          type="number"
                          id="FIB4-lab"
                          disabled
                          value={fib4Lab}
                          // value={fib4s.toFixed(2)}
                          onChange={(e) => setFIB4Lab(e.target.value)}
                          className="form-control"
                          style={{ width: 150 }}
                        />
                      </div>
                      <div className="col-sm-6" style={{ marginTop: 20 }}>
                        <label htmlFor="ast-platelet-lab" className="label-txt">
                          AST to Platelet Ratio Index (APRI)
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          readOnly
                          type="number"
                          required={modelEndStageLab === "Applicable"}
                          id="ast-platelet-lab"
                          disabled
                          value={astPlateletLab}
                          // value={astss}
                          onChange={(e) => setastPlateletLab(e.target.value)}
                          className="form-control"
                          style={{ width: 150 }}
                        />
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
          {/* ===============================Comorbidities container========================*/}
          <div>
            <div className="study-container">
              <div className="studyData-container">
                <h1 className="study-txt">Comorbidities</h1>
                <button
                  type="button"
                  onClick={comorbiditiesButtonHandle}
                  className="study-btn"
                >
                  {comorbiditiesButton ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </button>
              </div>
              <div className={comorbiditiesButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="col-sm-3">Disease/Disorder</th>
                          <th className="col-sm-1 text-center">Yes</th>
                          <th className="col-sm-1 text-center">No</th>
                          <th className="col-sm-1 text-center">Unknown</th>
                          <th className="col-sm-4">If Yes,</th>
                          <th className="col-sm-2">If Yes, No of Years</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="col-sm-3">
                            Diabetes
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              required
                              checked={diabetesComorbidities === "Yes"}
                              value={"Yes"}
                              onChange={(e) =>
                                setComorbiditiesDiabetes(e.target.value)
                              }
                              name="comorbidities-diabetes"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={diabetesComorbidities === "No"}
                              value={"No"}
                              onChange={(e) => {
                                if (diabetesComorbidities === "Yes") {
                                  setDiabetesAfter("");
                                  setYesDiabetesInput("");
                                } else {
                                  setDiabetesAfter("");
                                  setYesDiabetesInput("");
                                }
                                setComorbiditiesDiabetes(e.target.value);
                              }}
                              name="comorbidities-diabetes"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={diabetesComorbidities === "Unknown"}
                              value={"Unknown"}
                              onChange={(e) => {
                                if (diabetesComorbidities === "Yes") {
                                  setDiabetesAfter("");
                                  setYesDiabetesInput("");
                                } else {
                                  setDiabetesAfter("");
                                  setYesDiabetesInput("");
                                }
                                setComorbiditiesDiabetes(e.target.value);
                              }}
                              name="comorbidities-diabetes"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-4">
                            <div>
                              <label>Prior to</label>
                              <input
                                onKeyDown={handleKeyPress}
                                disabled={diabetesComorbidities !== "Yes"}
                                checked={diabetesAfter === "Prior to"}
                                value={"Prior to"}
                                onChange={(e) => setDiabetesAfter(e.target.value)}
                                type="radio"
                                name="diabetes-yes"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                disabled={diabetesComorbidities !== "Yes"}
                                checked={diabetesAfter === "After"}
                                value={"After"}
                                onChange={(e) => setDiabetesAfter(e.target.value)}
                                type="radio"
                                name="diabetes-yes"
                                className="mL5"
                              />
                              <label className="mL5">NAV</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="diabetes-yes"
                                checked={diabetesAfter === "NAV"}
                                onChange={(e) => setDiabetesAfter(e.target.value)}
                                value={"NAV"}
                                disabled={diabetesComorbidities !== "Yes"}
                                type="radio"
                                className="mL5"
                              />
                            </div>
                          </td>
                          <td className="col-sm-2">
                            <input
                              onKeyDown={handleKeyPress}
                              value={yesDiabetesInput}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^\d{0,2}$/.test(inputValue)) {
                                  setYesDiabetesInput(e.target.value);
                                }
                              }}
                              disabled={diabetesComorbidities !== "Yes"}
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            Hypertension
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              required
                              checked={hypertensionComorbidities === "Yes"}
                              value={"Yes"}
                              onChange={(e) =>
                                setComorbiditiesHypertension(e.target.value)
                              }
                              name="comorbidities-hypertension"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={hypertensionComorbidities === "No"}
                              value={"No"}
                              onChange={(e) => {
                                if (hypertensionComorbidities === "Yes") {
                                  setHypertensionAfter("");
                                  setYesHyperTensionInput("");
                                } else {
                                  setHypertensionAfter("");
                                  setYesHyperTensionInput("");
                                }
                                setComorbiditiesHypertension(e.target.value);
                              }}
                              name="comorbidities-hypertension"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={hypertensionComorbidities === "Unknown"}
                              value={"Unknown"}
                              onChange={(e) => {
                                if (hypertensionComorbidities === "Yes") {
                                  setHypertensionAfter("");
                                  setYesHyperTensionInput("");
                                } else {
                                  setHypertensionAfter("");
                                  setYesHyperTensionInput("");
                                }
                                setComorbiditiesHypertension(e.target.value);
                              }}
                              name="comorbidities-hypertension"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-4">
                            <div>
                              <label>Prior to</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="hypertension-yes"
                                disabled={hypertensionComorbidities !== "Yes"}
                                checked={hypertensionAfter === "Prior to"}
                                onChange={(e) => setHypertensionAfter(e.target.value)}
                                value={"Prior to"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="hypertension-yes"
                                disabled={hypertensionComorbidities !== "Yes"}
                                checked={hypertensionAfter === "After"}
                                onChange={(e) => setHypertensionAfter(e.target.value)}
                                value={"After"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">NAV</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="hypertension-yes"
                                disabled={hypertensionComorbidities !== "Yes"}
                                checked={hypertensionAfter === "NAV"}
                                onChange={(e) => setHypertensionAfter(e.target.value)}
                                value={"NAV"}
                                type="radio"
                                className="mL5"
                              />
                            </div>
                          </td>
                          <td className="col-sm-2">
                            <input
                              onKeyDown={handleKeyPress}
                              value={yesHyperTensionInput}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^\d{0,2}$/.test(inputValue)) {
                                  setYesHyperTensionInput(e.target.value);
                                }
                              }}
                              disabled={hypertensionComorbidities !== "Yes"}
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            Dyslipidemia
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              required
                              checked={dyslipidemiaComorbidities === "Yes"}
                              value={"Yes"}
                              onChange={(e) =>
                                setComorbiditiesDyslipidemia(e.target.value)
                              }
                              name="comorbidities-dyslipidemia"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={dyslipidemiaComorbidities === "No"}
                              value={"No"}
                              onChange={(e) => {
                                if (dyslipidemiaComorbidities === "Yes") {
                                  setDyslipidemiaAfter("");
                                  setYesDyslipidemiaInput("");
                                } else {
                                  setDyslipidemiaAfter("");
                                  setYesDyslipidemiaInput("");
                                }
                                setComorbiditiesDyslipidemia(e.target.value);
                              }}
                              name="comorbidities-dyslipidemia"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={dyslipidemiaComorbidities === "Unknown"}
                              value={"Unknown"}
                              onChange={(e) => {
                                if (dyslipidemiaComorbidities === "Yes") {
                                  setDyslipidemiaAfter("");
                                  setYesDyslipidemiaInput("");
                                } else {
                                  setDyslipidemiaAfter("");
                                  setYesDyslipidemiaInput("");
                                }
                                setComorbiditiesDyslipidemia(e.target.value);
                              }}
                              name="comorbidities-dyslipidemia"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-4">
                            <div>
                              <label>Prior to</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="dyslipidemia-yes"
                                disabled={dyslipidemiaComorbidities !== "Yes"}
                                checked={dysliAfter === "Prior to"}
                                onChange={(e) => setDyslipidemiaAfter(e.target.value)}
                                value={"Prior to"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="dyslipidemia-yes"
                                disabled={dyslipidemiaComorbidities !== "Yes"}
                                checked={dysliAfter === "After"}
                                onChange={(e) => setDyslipidemiaAfter(e.target.value)}
                                value={"After"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">Nav</label>
                              <input
                                onKeyDown={handleKeyPress}
                                value={"Nav"}
                                name="dyslipidemia-yes"
                                checked={dysliAfter === "Nav"}
                                onChange={(e) => setDyslipidemiaAfter(e.target.value)}
                                disabled={dyslipidemiaComorbidities !== "Yes"}
                                type="radio"
                                className="mL5"
                              />
                            </div>
                          </td>
                          <td className="col-sm-2">
                            <input
                              onKeyDown={handleKeyPress}
                              value={yesDyslipidemiaInput}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^\d{0,2}$/.test(inputValue)) {
                                  setYesDyslipidemiaInput(e.target.value);
                                }
                              }}
                              disabled={dyslipidemiaComorbidities !== "Yes"}
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            Coronary Artery Disease
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              required
                              checked={coronaryComorbidities === "Yes"}
                              value={"Yes"}
                              onChange={(e) =>
                                setComorbiditiesCoronary(e.target.value)
                              }
                              name="comorbidities-coronary"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={coronaryComorbidities === "No"}
                              value={"No"}
                              onChange={(e) => {
                                if (coronaryComorbidities === "Yes") {
                                  setCoronaryAfter("");
                                  setYesCoronaryInput("");
                                } else {
                                  setCoronaryAfter("");
                                  setYesCoronaryInput("");
                                }
                                setComorbiditiesCoronary(e.target.value);
                              }}
                              name="comorbidities-coronary"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={coronaryComorbidities === "Unknown"}
                              value={"Unknown"}
                              onChange={(e) => {
                                if (coronaryComorbidities === "Yes") {
                                  setCoronaryAfter("");
                                  setYesCoronaryInput("");
                                } else {
                                  setCoronaryAfter("");
                                  setYesCoronaryInput("");
                                }
                                setComorbiditiesCoronary(e.target.value);
                              }}
                              name="comorbidities-coronary"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-4">
                            <div>
                              <label>Prior to</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="coronary-yes"
                                disabled={coronaryComorbidities !== "Yes"}
                                checked={coronaryAfter === "Prior to"}
                                onChange={(e) => setCoronaryAfter(e.target.value)}
                                value={"Prior to"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="coronary-yes"
                                disabled={coronaryComorbidities !== "Yes"}
                                checked={coronaryAfter === "After"}
                                onChange={(e) => setCoronaryAfter(e.target.value)}
                                value={"After"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">NAV</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="coronary-yes"
                                checked={coronaryAfter === "NAV"}
                                onChange={(e) => setCoronaryAfter(e.target.value)}
                                value={"NAV"}
                                disabled={coronaryComorbidities !== "Yes"}
                                type="radio"
                                className="mL5"
                              />
                            </div>
                          </td>
                          <td className="col-sm-2">
                            <input
                              onKeyDown={handleKeyPress}
                              value={yesCoronaryInput}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^\d{0,2}$/.test(inputValue)) {
                                  setYesCoronaryInput(e.target.value);
                                }
                              }}
                              disabled={coronaryComorbidities !== "Yes"}
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            Peripheral Vascular Disease
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              required
                              checked={peripheralComorbidities === "Yes"}
                              value={"Yes"}
                              onChange={(e) =>
                                setComorbiditiesPeripheral(e.target.value)
                              }
                              name="comorbidities-peripheral"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={peripheralComorbidities === "No"}
                              value={"No"}
                              onChange={(e) => {
                                if (peripheralComorbidities === "Yes") {
                                  setPeripheralAfter("");
                                  setYesPeripheralInput("");
                                } else {
                                  setPeripheralAfter("");
                                  setYesPeripheralInput("");
                                }
                                setComorbiditiesPeripheral(e.target.value);
                              }}
                              name="comorbidities-peripheral"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={peripheralComorbidities === "Unknown"}
                              value={"Unknown"}
                              onChange={(e) => {
                                if (peripheralComorbidities === "Yes") {
                                  setPeripheralAfter("");
                                  setYesPeripheralInput("");
                                } else {
                                  setPeripheralAfter("");
                                  setYesPeripheralInput("");
                                }
                                setComorbiditiesPeripheral(e.target.value);
                              }}
                              name="comorbidities-peripheral"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-4">
                            <div>
                              <label>Prior to</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="peripheral-yes"
                                disabled={peripheralComorbidities !== "Yes"}
                                checked={peripheralAfter === "Prior to"}
                                onChange={(e) => setPeripheralAfter(e.target.value)}
                                value={"Prior to"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="peripheral-yes"
                                disabled={peripheralComorbidities !== "Yes"}
                                checked={peripheralAfter === "After"}
                                onChange={(e) => setPeripheralAfter(e.target.value)}
                                value={"After"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">NAV</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="peripheral-yes"
                                value={"NAV"}
                                checked={peripheralAfter === "NAV"}
                                onChange={(e) => setPeripheralAfter(e.target.value)}
                                disabled={peripheralComorbidities !== "Yes"}
                                type="radio"
                                className="mL5"
                              />
                            </div>
                          </td>
                          <td className="col-sm-2">
                            <input
                              onKeyDown={handleKeyPress}
                              value={yesPeripheralInput}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^\d{0,2}$/.test(inputValue)) {
                                  setYesPeripheralInput(e.target.value);
                                }
                              }}
                              disabled={peripheralComorbidities !== "Yes"}
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            HIV
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              required
                              checked={hivComorbidities === "Yes"}
                              value={"Yes"}
                              onChange={(e) => setComorbiditiesHiv(e.target.value)}
                              name="comorbidities-hiv"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={hivComorbidities === "No"}
                              value={"No"}
                              onChange={(e) => {
                                if (hivComorbidities === "Yes") {
                                  setHIVAfter("");
                                  setYesHivInput("");
                                  // -----
                                  setHistoryHiv("");
                                  setYearOfHIVHCC("");
                                  setDateOfHIVDurationFrom("");
                                  setHIVRNAHCC("");
                                  setBelowRadioHCC("");
                                  setHIVCD4("");
                                  setHIVCD4Nav("");
                                  setHivAbsoluteCD4("");
                                  setHivAbsoluteCD4Nav("");
                                  setHIVCD4CellCount("");
                                  setHIVCD4CellCountNav("");
                                  setHivInitialHIV1("");
                                  setHivInitialHIV1Nav("");
                                  setMaximumHIVRNA("");
                                  setMaximumHIVRNANav("");
                                } else {
                                  setHIVAfter("");
                                  setYesHivInput("");
                                  // -----
                                  setHistoryHiv("");
                                  setYearOfHIVHCC("");
                                  setDateOfHIVDurationFrom("");
                                  setHIVRNAHCC("");
                                  setBelowRadioHCC("");
                                  setHIVCD4("");
                                  setHIVCD4Nav("");
                                  setHivAbsoluteCD4("");
                                  setHivAbsoluteCD4Nav("");
                                  setHIVCD4CellCount("");
                                  setHIVCD4CellCountNav("");
                                  setHivInitialHIV1("");
                                  setHivInitialHIV1Nav("");
                                  setMaximumHIVRNA("");
                                  setMaximumHIVRNANav("");
                                }
                                setComorbiditiesHiv(e.target.value);
                              }}
                              name="comorbidities-hiv"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              checked={hivComorbidities === "Unknown"}
                              value={"Unknown"}
                              onChange={(e) => {
                                if (hivComorbidities === "Yes") {
                                  setHIVAfter("");
                                  setYesHivInput("");
                                  // -----
                                  setHistoryHiv("");
                                  setYearOfHIVHCC("");
                                  setDateOfHIVDurationFrom("");
                                  setHIVRNAHCC("");
                                  setBelowRadioHCC("");
                                  setHIVCD4("");
                                  setHIVCD4Nav("");
                                  setHivAbsoluteCD4("");
                                  setHivAbsoluteCD4Nav("");
                                  setHIVCD4CellCount("");
                                  setHIVCD4CellCountNav("");
                                  setHivInitialHIV1("");
                                  setHivInitialHIV1Nav("");
                                  setMaximumHIVRNA("");
                                  setMaximumHIVRNANav("");
                                } else {
                                  setHIVAfter("");
                                  setYesHivInput("");
                                  // -----
                                  setHistoryHiv("");
                                  setYearOfHIVHCC("");
                                  setDateOfHIVDurationFrom("");
                                  setHIVRNAHCC("");
                                  setBelowRadioHCC("");
                                  setHIVCD4("");
                                  setHIVCD4Nav("");
                                  setHivAbsoluteCD4("");
                                  setHivAbsoluteCD4Nav("");
                                  setHIVCD4CellCount("");
                                  setHIVCD4CellCountNav("");
                                  setHivInitialHIV1("");
                                  setHivInitialHIV1Nav("");
                                  setMaximumHIVRNA("");
                                  setMaximumHIVRNANav("");
                                }
                                setComorbiditiesHiv(e.target.value);
                              }}
                              name="comorbidities-hiv"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-4">
                            <div>
                              <label>Prior to</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="hivcom-yes"
                                disabled={hivComorbidities !== "Yes"}
                                checked={hivAfter === "Prior to"}
                                onChange={(e) => setHIVAfter(e.target.value)}
                                value={"Prior to"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="hivcom-yes"
                                disabled={hivComorbidities !== "Yes"}
                                checked={hivAfter === "After"}
                                onChange={(e) => setHIVAfter(e.target.value)}
                                value={"After"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">NAV</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="hivcom-yes"
                                value={"NAV"}
                                checked={hivAfter === "NAV"}
                                onChange={(e) => setHIVAfter(e.target.value)}
                                disabled={hivComorbidities !== "Yes"}
                                type="radio"
                                className="mL5"
                              />
                            </div>
                          </td>
                          <td className="col-sm-2">
                            <input
                              onKeyDown={handleKeyPress}
                              value={yesHivInput}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^\d{0,2}$/.test(inputValue)) {
                                  setYesHivInput(e.target.value);
                                }
                              }}
                              disabled={hivComorbidities !== "Yes"}
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            Non-liver cancer
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              name="comorbidities-non-liver"
                              value={"Yes"}
                              checked={nonLiverCancer === "Yes"}
                              onChange={(e) => setNonLiverCancer(e.target.value)}
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              name="comorbidities-non-liver"
                              value={"No"}
                              checked={nonLiverCancer === "No"}
                              onChange={(e) => {
                                if (nonLiverCancer === "Yes") {
                                  setYesLocationSiteValue("");
                                  setYesStageValue("");
                                  setYesYearOfdiagnosis("");
                                } else {
                                  setYesLocationSiteValue("");
                                  setYesStageValue("");
                                  setYesYearOfdiagnosis("");
                                }
                                setNonLiverCancer(e.target.value);
                              }}
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              value={"Unknown"}
                              checked={nonLiverCancer === "Unknown"}
                              onChange={(e) => {
                                if (nonLiverCancer === "Yes") {
                                  setYesLocationSiteValue("");
                                  setYesStageValue("");
                                  setYesYearOfdiagnosis("");
                                } else {
                                  setYesLocationSiteValue("");
                                  setYesStageValue("");
                                  setYesYearOfdiagnosis("");
                                }
                                setNonLiverCancer(e.target.value);
                              }}
                              name="comorbidities-non-liver"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-4">

                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="row">
                      <div className="col-sm-4">
                        <label htmlFor="if-yes-location" className="label-txt">
                          If Yes, Location/site
                        </label>
                        <textarea
                          onKeyDown={handleKeyPress}
                          // required={isChecked}
                          maxLength={20}
                          id="if-yes-location"
                          disabled={nonLiverCancer !== "Yes"}
                          value={yesLocationSiteValue}
                          onChange={(e) => setYesLocationSiteValue(e.target.value)}
                          type="text"
                          className="form-control"
                          rows={1}
                        ></textarea>
                      </div>
                      <div className="col-sm-4">
                        <label htmlFor="if-yes-stage" className="label-txt">
                          If Yes, Stage
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          // required={isChecked}
                          id="if-yes-stage"
                          // min={10}
                          // max={99}
                          disabled={nonLiverCancer !== "Yes"}
                          value={yesStageValue}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,2}$/.test(inputValue)) {
                              setYesStageValue(e.target.value);
                            }
                          }}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label htmlFor="if-yes-diagnosis" className="label-txt">
                          If Yes, Year of Diagnosis
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          // required={isChecked}
                          id="if-yes-diagnosis"
                          // min={1900}
                          // max={2040}
                          disabled={nonLiverCancer !== "Yes"}
                          value={yesYearOfDiagnosis}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setYesYearOfdiagnosis(e.target.value);
                            }
                          }}
                          type="text"
                          placeholder="YYYY"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="container-width-for-chronic" style={{ marginTop: 20 }}>
                      <label className="label-txt">
                        Alcohol Consumption / Abuse
                      </label>
                      <div className="chronic-mittal">
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            required
                            className="gap"
                            id="alcohol-consumption-no"
                            checked={alcoholConsumptionValue === "No"}
                            value={"No"}
                            onChange={(e) => {
                              if (alcoholConsumptionValue === "Yes") {
                                setAlcoholConsumptionValueSub("");
                              } else {
                                setAlcoholConsumptionValueSub("");
                              }
                              setAlcoholConsumptionValue(e.target.value);
                            }}
                            name="Alcohol Consumption"
                            type="radio"
                          />
                          <label htmlFor="alcohol-consumption-no">No</label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="alcohol-consumption-yes"
                            checked={alcoholConsumptionValue === "Yes"}
                            value={"Yes"}
                            onChange={(e) =>
                              setAlcoholConsumptionValue(e.target.value)
                            }
                            name="Alcohol Consumption"
                            type="radio"
                          />
                          <label htmlFor="alcohol-consumption-yes">Yes /</label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap g"
                            id="alcohol-consumption-history"
                            disabled={alcoholConsumptionValue !== "Yes"}
                            checked={
                              alcoholConsumptionValueSub ===
                              "history of more than 3 drinks per day for men or more than 2 drinks per day for women"
                            }
                            value={
                              "history of more than 3 drinks per day for men or more than 2 drinks per day for women"
                            }
                            onChange={(e) =>
                              setAlcoholConsumptionValueSub(e.target.value)
                            }
                            name="Alcohol Consumption-sub"
                            type="radio"
                          />
                          <label htmlFor="alcohol-consumption-history">
                            History of more than 3 drinks per day for men or more
                            than 2 drinks per day for women
                          </label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap g"
                            id="alcohol-consumption-document"
                            disabled={alcoholConsumptionValue !== "Yes"}
                            checked={
                              alcoholConsumptionValueSub ===
                              "documentation of alcoholistm/alcoholic abuse in progress notes"
                            }
                            value={
                              "documentation of alcoholistm/alcoholic abuse in progress notes"
                            }
                            onChange={(e) =>
                              setAlcoholConsumptionValueSub(e.target.value)
                            }
                            name="Alcohol Consumption-sub"
                            type="radio"
                          />
                          <label htmlFor="alcohol-consumption-document">
                          Documentation of alcoholism/alcoholic abuse in progress notes
                            notes
                          </label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap g"
                            id="alcohol-consumption-enrollment"
                            disabled={alcoholConsumptionValue !== "Yes"}
                            checked={
                              alcoholConsumptionValueSub ===
                              "enrollment in rehabilitation"
                            }
                            value={"enrollment in rehabilitation"}
                            onChange={(e) =>
                              setAlcoholConsumptionValueSub(e.target.value)
                            }
                            name="Alcohol Consumption-sub"
                            type="radio"
                          />
                          <label htmlFor="alcohol-consumption-enrollment">
                            Enrollment in rehabilitation
                          </label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap g"
                            id="alcohol-consumption-history-of"
                            disabled={alcoholConsumptionValue !== "Yes"}
                            checked={
                              alcoholConsumptionValueSub ===
                              "history of alcoholic hepatitis"
                            }
                            value={"history of alcoholic hepatitis"}
                            onChange={(e) =>
                              setAlcoholConsumptionValueSub(e.target.value)
                            }
                            name="Alcohol Consumption-sub"
                            type="radio"
                          />
                          <label htmlFor="alcohol-consumption-history-of">
                            History of alcoholic hepatitis
                          </label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="alcohol-consumption-unknown"
                            // disabled={alcoholConsumptionValue !== "Yes"}
                            checked={alcoholConsumptionValue === "Unknown"}
                            value={"Unknown"}
                            onChange={(e) => {
                              if (alcoholConsumptionValue === "Yes") {
                                setAlcoholConsumptionValueSub("");
                              } else {
                                setAlcoholConsumptionValueSub("");
                              }
                              setAlcoholConsumptionValue(e.target.value);
                            }}
                            name="Alcohol Consumption"
                            type="radio"
                          />
                          <label htmlFor="alcohol-consumption-unknown">
                            Unknown
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
          {/* HCC Diagnosis Info Container */}
          <div className="study-container">
            <div className="studyData-container">
              <h1 className="study-txt">HCC Diagnosis Information</h1>
              <button
                type="button"
                onClick={hccDiagnosisInfoHandle}
                className="study-btn"
              >
                {hccDiagnosisUp ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </button>
            </div>
            <div className={hccDiagnosisUp ? "study-data" : ""}>
              <Fade>
                <div className="card p-3">
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Method of Diagnosis</label>
                    </div>
                    <div className="col-sm-8">
                      <div className="chronic-mittal">
                        <div style={{ display: 'inline-flex' }}>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            required={!diagnosisInformationValue.length}
                            id="diagnosis-information-bio"
                            checked={
                              diagnosisInformationValue.includes(
                                "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)")
                            }
                            value={
                              "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)"
                            }
                            onChange={(e) => {
                              const s = e.target.value;
                              // if (s === "Other(specify)") {
                              //   sethccDiagnosisInfo("");
                              // } else {
                              //   sethccDiagnosisInfo("");
                              // }
                              let updatedValues;
                              if (diagnosisInformationValue.includes(s)) {
                                updatedValues = diagnosisInformationValue.filter(
                                  (item) => item !== s
                                );
                              } else {
                                updatedValues = [...diagnosisInformationValue, s];
                              }
                              setDiagnosisInformationValue(updatedValues);
                            }}
                            name="diagnosis-information"
                            type="checkbox"
                          />
                          <label htmlFor="diagnosis-information-bio">
                            Biopsy(any tissue diagnosis including(fine needle
                            aspiration) FNA)
                          </label>
                        </div>
                        <div style={{ display: 'inline-flex' }}>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            // required={!diagnosisInformationValue.length}
                            id="diagnosis-information-other"
                            checked={diagnosisInformationValue.includes("Other(specify)")}
                            value={"Other(specify)"}
                            onChange={(e) => {
                              // setDiagnosisInformationValue(e.target.value)
                              const s = e.target.value;
                              if (s === "Other(specify)") {
                                sethccDiagnosisInfo("");
                              } else {
                                sethccDiagnosisInfo("");
                              }
                              let updatedValues;
                              if (diagnosisInformationValue.includes(s)) {
                                updatedValues = diagnosisInformationValue.filter(
                                  (item) => item !== s
                                );
                              } else {
                                updatedValues = [...diagnosisInformationValue, s];
                              }
                              setDiagnosisInformationValue(updatedValues);
                            }}
                            name="diagnosis-information"
                            type="checkbox"
                          />
                          <label htmlFor="diagnosis-information-other" style={{ marginTop: 10 }}>
                            Other(specify)
                          </label>
                          <textarea
                            onKeyDown={handleKeyPress}
                            className="form-control"
                            rows={1}
                            style={{ marginLeft: 20 }}
                            maxLength={50}
                            // required={diagnosisInformationValue === "Other(specify)"}
                            disabled={!diagnosisInformationValue.includes("Other(specify)")}
                            onChange={(e) => sethccDiagnosisInfo(e.target.value)}
                            value={hccDiagnosisInfoValueOtherSpecify}
                          ></textarea>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="diagnosis-imaging"
                            // required={!diagnosisInformationValue.length}
                            checked={diagnosisInformationValue.includes("Imaging")}
                            value={"Imaging"}
                            onChange={(e) => {
                              const s = e.target.value;
                              // if (s === "Other(specify)") {
                              //   sethccDiagnosisInfo("");
                              // } else {
                              //   sethccDiagnosisInfo("");
                              // }
                              let updatedValues;
                              if (diagnosisInformationValue.includes(s)) {
                                updatedValues = diagnosisInformationValue.filter(
                                  (item) => item !== s
                                );
                              } else {
                                updatedValues = [...diagnosisInformationValue, s];
                              }
                              setDiagnosisInformationValue(updatedValues);
                            }}
                            name="diagnosis-information"
                            type="checkbox"
                          />
                          <label htmlFor="diagnosis-imaging" style={{ marginTop: 10 }}>Imaging</label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="diagnosis-unknown"
                            // required={!diagnosisInformationValue.length}
                            checked={diagnosisInformationValue.includes("Unknown")}
                            value={"Unknown"}
                            onChange={(e) => {
                              const s = e.target.value;
                              // if (s === "Other(specify)") {
                              //   sethccDiagnosisInfo("");
                              // } else {
                              //   sethccDiagnosisInfo("");
                              // }
                              let updatedValues;
                              if (diagnosisInformationValue.includes(s)) {
                                updatedValues = diagnosisInformationValue.filter(
                                  (item) => item !== s
                                );
                              } else {
                                updatedValues = [...diagnosisInformationValue, s];
                              }
                              setDiagnosisInformationValue(updatedValues);
                            }}
                            name="diagnosis-information"
                            type="checkbox"
                          />
                          <label htmlFor="diagnosis-unknown" style={{ marginTop: 10 }}>Unknown</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-widthd-comorbidities">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Type of Imaging</label>
                    </div>
                    <div className="col-sm-8">
                      <div style={{ display: 'inline-flex' }}>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          required
                          checked={typeOfImagine === "MRI"}
                          name="type-imaging"
                          value={"MRI"}
                          onChange={(e) => {
                            if (typeOfImagine === "Other") {
                              setTypeOfImagineText("");
                            } else {
                              setTypeOfImagineText("");
                            }
                            setTypeOfImagine(e.target.value);
                          }}
                          id="hcc-imaging-mri"
                          type="radio"
                          disabled={!diagnosisInformationValue.includes("Imaging")}
                        />
                        <label htmlFor="hcc-imaging-mri" style={{ marginTop: 10 }}>MRI</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          checked={typeOfImagine === "CT"}
                          value={"CT"}
                          name="type-imaging"
                          onChange={(e) => {
                            if (typeOfImagine === "Other") {
                              setTypeOfImagineText("");
                            } else {
                              setTypeOfImagineText("");
                            }
                            setTypeOfImagine(e.target.value);
                          }}
                          required
                          id="hcc-imaging-ct"
                          type="radio"
                          disabled={!diagnosisInformationValue.includes("Imaging")}
                        />
                        <label htmlFor="hcc-imaging-ct" style={{ marginTop: 10 }}>CT</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          name="type-imaging"
                          checked={typeOfImagine === "US"}
                          value={"US"}
                          onChange={(e) => {
                            if (typeOfImagine === "Other") {
                              setTypeOfImagineText("");
                            } else {
                              setTypeOfImagineText("");
                            }
                            setTypeOfImagine(e.target.value);
                          }}
                          required
                          id="hcc-imaging-us"
                          type="radio"
                          disabled={!diagnosisInformationValue.includes("Imaging")}
                        />
                        <label htmlFor="hcc-imaging-us" style={{ marginTop: 10 }}>US</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          name="type-imaging"
                          checked={typeOfImagine === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => {
                            if (typeOfImagine === "Other") {
                              setTypeOfImagineText("");
                            } else {
                              setTypeOfImagineText("");
                            }
                            setTypeOfImagine(e.target.value);
                          }}
                          required
                          id="hcc-imaging-un"
                          type="radio"
                          disabled={!diagnosisInformationValue.includes("Imaging")}
                        />
                        <label htmlFor="hcc-imaging-un" style={{ marginTop: 10 }}>Unknown</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          name="type-imaging"
                          checked={typeOfImagine === "Other"}
                          value={"Other"}
                          onChange={(e) => {
                            if (typeOfImagine === "Other") {
                              setTypeOfImagineText("");
                            } else {
                              setTypeOfImagineText("");
                            }
                            setTypeOfImagine(e.target.value);
                          }}
                          required
                          id="hcc-imaging-other"
                          type="radio"
                          disabled={!diagnosisInformationValue.includes("Imaging")}
                        />
                        <label htmlFor="hcc-imaging-other" style={{ marginTop: 10 }}>Other</label>
                        <textarea
                          onKeyDown={handleKeyPress}
                          value={typeOfImagineText}
                          maxLength={50}
                          rows={1}
                          style={{ marginLeft: 20 }}
                          onChange={(e) => setTypeOfImagineText(e.target.value)}
                          required={typeOfImagine === "Other"}
                          disabled={typeOfImagine !== "Other"}
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        Date of Imaging(first) Found
                      </label>
                    </div>
                    <div className="col-sm-8" style={{ display: 'inline-flex' }}>
                      <div className="container-width">
                        <input
                          onKeyDown={handleKeyPress}
                          value={hccDiagnosisImagingDate}
                          disabled={hccDiagnosisImagingUnkown[0] === "Unknown" || !diagnosisInformationValue.includes("Imaging")}
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            sethccDiagnosisImagingDate(formattedDate);
                          }}
                          // placeholder="DD-MM-YYYY"
                          className="form-control"
                          type="date"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={hccDiagnosisImagingDate}
                          onChange={date => sethccDiagnosisImagingDate(date)}
                          disabled={hccDiagnosisImagingUnkown[0] === "Unknown" || !diagnosisInformationValue.includes("Imaging")}
                          startDate={hccDiagnosisImagingDate}
                          dateFormat={'dd/MMM/yyyy'}
                          className="form-control date"
                          placeholderText="DD/MMM/YYYY"
                        /> */}
                      </div>
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          id="hccdate-imaging"
                          style={{ marginLeft: 20, marginTop: 10 }}
                          checked={hccDiagnosisImagingUnkown.includes("Unknown")}
                          onChange={() => handleDiagnosisImagingUnknown("Unknown")}
                          disabled={!diagnosisInformationValue.includes("Imaging")}
                          className="date-tissue"
                          type="checkbox"
                        />
                        <label htmlFor="hccdate-imaging" className="mL5">Unknown</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Date of Tissue Diagnosis</label>
                    </div>
                    <div className="col-sm-8" style={{ display: 'inline-flex' }}>
                      <div className="container-width">
                        <input
                          onKeyDown={handleKeyPress}
                          value={hccDiagnosisTissueDate}
                          disabled={hccDiagnosisTissueUnknown[0] === "Unknown" || !diagnosisInformationValue.includes("Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)")}
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            sethccDiagnosisTissueDate(formattedDate);
                          }}
                          className="form-control"
                          type="date"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={hccDiagnosisTissueDate}
                          disabled={hccDiagnosisTissueUnknown[0] === "Unknown" || !diagnosisInformationValue.includes("Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)")}
                          onChange={date => sethccDiagnosisTissueDate(date)}
                          startDate={hccDiagnosisTissueDate}
                          dateFormat={'dd/MMM/yyyy'}
                          className="form-control date"
                          placeholderText="DD/MMM/YYYY"
                        /> */}
                      </div>
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          id="hccdate-tissue"
                          style={{ marginLeft: 20, marginTop: 10 }}
                          checked={hccDiagnosisTissueUnknown.includes("Unknown")}
                          onChange={() => handleDiagnosisTissueUnknown("Unknown")}
                          className="date-tissue"
                          type="checkbox"
                          disabled={!diagnosisInformationValue.includes("Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)")}
                        />
                        <label htmlFor="hccdate-tissue" className="mL5">Unknown</label>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
          {/* HCC Diagnosis Infor Container */}

          {/* HCC Staging Container */}
          <div className="study-container">
            <div className="studyData-container">
              <h1 className="study-txt">HCC Staging</h1>
              <button
                type="button"
                onClick={HCCStagingHandle}
                className="study-btn"
              >
                {HCCStagingUp ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </button>
            </div>
            <div className={HCCStagingUp ? "study-data" : ""}>
              <Fade>
                <div className="card p-3">
                  <div className="container-width" style={{ width: '100%' }}>
                    <div className="col-sm-4">
                      <label htmlFor="large-turmor-size" className="label-txt" style={{ fontWeight: 600 }}>
                        Largest tumor size/diameter (if multiple nodules, include only the largest)
                      </label>
                    </div>
                    <div className="col-sm-8" style={{ display: 'inline-flex' }}>
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        maxLength={5}
                        id="large-turmor-size"
                        style={{ width: 150, height: 'fit-content' }}
                        value={largeTurmorValue}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (
                            /^\d{1,3}(\.\d{0,1})?$/.test(inputValue) ||
                            inputValue === ""
                          ) {
                            setLargeTurmorValue(inputValue);
                          }
                          // setLargeTurmorValue(e.target.value)
                        }}
                        className="form-control"
                        type="text"
                      />
                      <label className="hcc-cm">cm</label>
                    </div>
                  </div>
                  <div className="container-widthd-comorbidities">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        T(Primary Tumor) <br /> (as per Current TNM HCC classfication)
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        required
                        id="t-primary-tx"
                        checked={tPrimaryValue === "TX"}
                        value={"TX"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-tx">TX</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        id="t-primary-t0"
                        checked={tPrimaryValue === "T0"}
                        value={"T0"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t0">T0</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        id="t-primary-t1"
                        checked={tPrimaryValue === "T1"}
                        value={"T1"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t1">T1</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        id="t-primary-t2"
                        checked={tPrimaryValue === "T2"}
                        value={"T2"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t2">T2</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        id="t-primary-t3a"
                        checked={tPrimaryValue === "T3a"}
                        value={"T3a"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t3a">T3a</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        id="t-primary-t3b"
                        checked={tPrimaryValue === "T3b"}
                        value={"T3b"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t3b">T3b</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        id="t-primary-t4"
                        checked={tPrimaryValue === "T4"}
                        value={"T4"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t4">T4</label>
                    </div>
                  </div>
                  <div className="container-width" style={{ width: '100%' }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        N(Regional Lymph Nodes) <br /> (as per Current TNM HCC Classfication)
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        required
                        id="n-regional-nx"
                        checked={nRegionalValue === "NX"}
                        value={"NX"}
                        onChange={(e) => setNRegionalValue(e.target.value)}
                        name="n-regional-lymph"
                        type="radio"
                      />
                      <label htmlFor="n-regional-nx">NX</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        id="n-regional-n0"
                        checked={nRegionalValue === "N0"}
                        value={"N0"}
                        onChange={(e) => setNRegionalValue(e.target.value)}
                        name="n-regional-lymph"
                        type="radio"
                      />
                      <label htmlFor="n-regional-n0">N0</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        id="n-regional-n1"
                        checked={nRegionalValue === "N1"}
                        value={"N1"}
                        onChange={(e) => setNRegionalValue(e.target.value)}
                        name="n-regional-lymph"
                        type="radio"
                      />
                      <label htmlFor="n-regional-n1">N1</label>
                    </div>
                  </div>
                  <div className="container-width" style={{ width: '100%' }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        M(Distant Metastasis) <br /> (as per Current TNM HCC Classfication)
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        required
                        id="n-regional-mx"
                        checked={mRegionalValue === "MX"}
                        value={"MX"}
                        name="n-regional-metastasis"
                        onChange={(e) => setMRegionalValue(e.target.value)}
                        type="radio"
                      />
                      <label htmlFor="n-regional-mx">MX</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        id="n-regional-m0"
                        checked={mRegionalValue === "M0"}
                        value={"M0"}
                        onChange={(e) => setMRegionalValue(e.target.value)}
                        name="n-regional-metastasis"
                        type="radio"
                      />
                      <label htmlFor="n-regional-m0">M0</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="gap"
                        id="n-regional-m1"
                        checked={mRegionalValue === "M1"}
                        value={"M1"}
                        onChange={(e) => setMRegionalValue(e.target.value)}
                        name="n-regional-metastasis"
                        type="radio"
                      />
                      <label htmlFor="n-regional-m1">M1</label>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        Anatomic Stage <br /> (as per Current TNM HCC Classfication)
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <div className="row">
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            required
                            id="anatomic-stage1"
                            checked={anatomicStageTNM === "Stage I(T1 N0 M0)"}
                            value={"Stage I(T1 N0 M0)"}
                            onChange={(e) => setAnatomicStageTNM(e.target.value)}
                            name="anatomic-stage"
                            type="radio"
                          />
                          <label htmlFor="anatomic-stage1" className="mt-2">
                            Stage I(T1 N0 M0)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="anatomic-stage2"
                            checked={anatomicStageTNM === "Stage II(T2 N0 M0)"}
                            value={"Stage II(T2 N0 M0)"}
                            onChange={(e) => setAnatomicStageTNM(e.target.value)}
                            name="anatomic-stage"
                            type="radio"
                          />
                          <label htmlFor="anatomic-stage2" className="mt-2">
                            Stage II(T2 N0 M0)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="anatomic-stage3a"
                            checked={anatomicStageTNM === "Stage IIIA(T3a N0 M0)"}
                            value={"Stage IIIA(T3a N0 M0)"}
                            onChange={(e) => setAnatomicStageTNM(e.target.value)}
                            name="anatomic-stage"
                            type="radio"
                          />
                          <label htmlFor="anatomic-stage3a" className="mt-2">
                            Stage IIIA(T3a N0 M0)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="anatomic-stage3b"
                            checked={anatomicStageTNM === "Stage IIIB(T3b N0 M0)"}
                            value={"Stage IIIB(T3b N0 M0)"}
                            onChange={(e) => setAnatomicStageTNM(e.target.value)}
                            name="anatomic-stage"
                            type="radio"
                          />
                          <label htmlFor="anatomic-stage3b" className="mt-2">
                            Stage IIIB(T3b N0 M0)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="anatomic-stage3c"
                            checked={anatomicStageTNM === "Stage IIIC(T4 N0 M0)"}
                            value={"Stage IIIC(T4 N0 M0)"}
                            onChange={(e) => setAnatomicStageTNM(e.target.value)}
                            name="anatomic-stage"
                            type="radio"
                          />
                          <label htmlFor="anatomic-stage3c" className="mt-2">
                            Stage IIIC(T4 N0 M0)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="anatomic-stage4a"
                            checked={
                              anatomicStageTNM === "Stage IVA(Any T N1 M0)"
                            }
                            value={"Stage IVA(Any T N1 M0)"}
                            onChange={(e) => setAnatomicStageTNM(e.target.value)}
                            name="anatomic-stage"
                            type="radio"
                          />
                          <label htmlFor="anatomic-stage4a" className="mt-2">
                            Stage IVA(Any T N1 M0)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="anatomic-stage4b"
                            checked={
                              anatomicStageTNM === "Stage IVB(Any T Any N M1)"
                            }
                            value={"Stage IVB(Any T Any N M1)"}
                            onChange={(e) => setAnatomicStageTNM(e.target.value)}
                            name="anatomic-stage"
                            type="radio"
                          />
                          <label htmlFor="anatomic-stage4b" className="mt-2">
                            Stage IVB(Any T Any N M1)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="anatomic-stagenav"
                            checked={anatomicStageTNM === "NAV/Cannot be staged"}
                            value={"NAV/Cannot be staged"}
                            onChange={(e) => setAnatomicStageTNM(e.target.value)}
                            name="anatomic-stage"
                            type="radio"
                          />
                          <label htmlFor="anatomic-stagenav" className="mt-2">
                            NAV/Cannot be staged{" "}
                          </label>
                        </div>
                      </div>
                      {/* <div className="d-subject">
                        <div className="chronic-mittal">
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              required
                              id="anatomic-stage1"
                              checked={anatomicStageTNM === "Stage I(T1 N0 M0)"}
                              value={"Stage I(T1 N0 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage1">
                              Stage I(T1 N0 M0)
                            </label>
                          </div>
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="anatomic-stage3b"
                              checked={anatomicStageTNM === "Stage IIIB(T3b N0 M0)"}
                              value={"Stage IIIB(T3b N0 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage3b">
                              Stage IIIB(T3b N0 M0)
                            </label>
                          </div>
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="anatomic-stage4b"
                              checked={
                                anatomicStageTNM === "Stage IVB(Any T Any N M1)"
                              }
                              value={"Stage IVB(Any T Any N M1)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage4b">
                              Stage IVB(Any T Any N M1)
                            </label>
                          </div>
                        </div>
                        <div className="chronic-mittal">
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="anatomic-stage2"
                              checked={anatomicStageTNM === "Stage II(T2 N0 M0)"}
                              value={"Stage II(T2 N0 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage2">
                              Stage II(T2 N0 M0)
                            </label>
                          </div>
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="anatomic-stage3c"
                              checked={anatomicStageTNM === "Stage IIIC(T4 N0 M0)"}
                              value={"Stage IIIC(T4 N0 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage3c">
                              Stage IIIC(T4 N0 M0)
                            </label>
                          </div>
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="anatomic-stagenav"
                              checked={anatomicStageTNM === "NAV/Cannot be staged"}
                              value={"NAV/Cannot be staged"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stagenav">
                              NAV/Cannot be staged{" "}
                            </label>
                          </div>
                        </div>
                        <div className="chronic-mittal">
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="anatomic-stage3a"
                              checked={anatomicStageTNM === "Stage IIIA(T3a N0 M0)"}
                              value={"Stage IIIA(T3a N0 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage3a">
                              Stage IIIA(T3a N0 M0)
                            </label>
                          </div>
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="anatomic-stage4a"
                              checked={
                                anatomicStageTNM === "Stage IVA(Any T N1 M0)"
                              }
                              value={"Stage IVA(Any T N1 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage4a">
                              Stage IVA(Any T N1 M0)
                            </label>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Tumor Differentiation</label>
                    </div>
                    <div className="col-sm-8">
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          required
                          id="tumor-differentiation-well"
                          checked={tumorDiffValue === "Well"}
                          value={"Well"}
                          onChange={(e) => setTumorDiffValue(e.target.value)}
                          name="tumor-differentiation"
                          type="radio"
                        />
                        <label htmlFor="tumor-differentiation-well">Well</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="tumor-differentiation-moderate"
                          checked={tumorDiffValue === "Moderate"}
                          value={"Moderate"}
                          onChange={(e) => setTumorDiffValue(e.target.value)}
                          name="tumor-differentiation"
                          type="radio"
                        />
                        <label htmlFor="tumor-differentiation-moderate">
                          Moderate
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="tumor-differentiation-poor"
                          checked={tumorDiffValue === "Poor"}
                          value={"Poor"}
                          onChange={(e) => setTumorDiffValue(e.target.value)}
                          name="tumor-differentiation"
                          type="radio"
                        />
                        <label htmlFor="tumor-differentiation-poor">Poor</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="tumor-differentiation-nav"
                          checked={tumorDiffValue === "Nav"}
                          value={"Nav"}
                          onChange={(e) => setTumorDiffValue(e.target.value)}
                          name="tumor-differentiation"
                          type="radio"
                        />
                        <label htmlFor="tumor-differentiation-nav">NAV</label>
                      </div>
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="tumor-differentiation-anaplastic"
                          checked={tumorDiffValue === "Undifferentiated/anaplastic"}
                          value={"Undifferentiated/anaplastic"}
                          onChange={(e) => setTumorDiffValue(e.target.value)}
                          name="tumor-differentiation"
                          type="radio"
                        />
                        <label htmlFor="tumor-differentiation-anaplastic">
                          Undifferentiated/Anaplastic
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        ECOG performance score (or Karnofsky equivalent) <br /> (as per Current ECOG performance scale if applicable)
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <div className="row">
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            required
                            id="ecog-performance0"
                            checked={ecogperformace === "0 (KPS 90 or 100)"}
                            value={"0 (KPS 90 or 100)"}
                            onChange={(e) => setEcogPerformace(e.target.value)}
                            name="ecog-performace"
                            type="radio"
                          />
                          <label htmlFor="ecog-performance0" className="mt-2">
                            0 (KPS 90 or 100)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="ecog-performance1-70"
                            checked={ecogperformace === "1 (KPS 70 or 80)"}
                            value={"1 (KPS 70 or 80)"}
                            onChange={(e) => setEcogPerformace(e.target.value)}
                            name="ecog-performace"
                            type="radio"
                          />
                          <label htmlFor="ecog-performance1-70" className="mt-2">
                            1 (KPS 70 or 80)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="ecog-performance-2-50"
                            checked={ecogperformace === "2 (KPS 50 or 60)"}
                            value={"2 (KPS 50 or 60)"}
                            onChange={(e) => setEcogPerformace(e.target.value)}
                            name="ecog-performace"
                            type="radio"
                          />
                          <label htmlFor="ecog-performance-2-50" className="mt-2">
                            2 (KPS 50 or 60)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="ecog-performance3"
                            checked={ecogperformace === "3 (KPS 30 or 40)"}
                            value={"3 (KPS 30 or 40)"}
                            onChange={(e) => setEcogPerformace(e.target.value)}
                            name="ecog-performace"
                            type="radio"
                          />
                          <label htmlFor="ecog-performance3" className="mt-2">
                            3 (KPS 30 or 40)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="ecog-performance-4-20"
                            checked={ecogperformace === "4 (KPS 10 or 20)"}
                            value={"4 (KPS 10 or 20)"}
                            onChange={(e) => setEcogPerformace(e.target.value)}
                            name="ecog-performace"
                            type="radio"
                          />
                          <label htmlFor="ecog-performance-0-4-20" className="mt-2">
                            4 (KPS 10 or 20)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="ecog-performance-3-dead"
                            checked={ecogperformace === "5 (KPS 0 = dead)"}
                            value={"5 (KPS 0 = dead)"}
                            onChange={(e) => setEcogPerformace(e.target.value)}
                            name="ecog-performace"
                            type="radio"
                          />
                          <label htmlFor="ecog-performance-3-dead" className="mt-2">
                            5 (KPS 0 = dead)
                          </label>
                        </div>
                        <div className="col-sm-6 inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            id="ecog-performance-2-50"
                            checked={ecogperformace === "NAV"}
                            value={"NAV"}
                            onChange={(e) => setEcogPerformace(e.target.value)}
                            name="ecog-performace"
                            type="radio"
                          />
                          <label htmlFor="ecog-performance-2-50" className="mt-2">
                            NAV
                          </label>
                        </div>
                      </div>
                      {/* <div className="d-subject">
                        <div className="chronic-mittal">
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              required
                              id="ecog-performance0"
                              checked={ecogperformace === "0 (KPS 90 or 100)"}
                              value={"0 (KPS 90 or 100)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance0">
                              0 (KPS 90 or 100)
                            </label>
                          </div>
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="ecog-performance3"
                              checked={ecogperformace === "3 (KPS 30 or 40)"}
                              value={"3 (KPS 30 or 40)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance3">
                              3 (KPS 30 or 40)
                            </label>
                          </div>
                        </div>
                        <div className="chronic-mittal">
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="ecog-performance1-70"
                              checked={ecogperformace === "1 (KPS 70 or 80)"}
                              value={"1 (KPS 70 or 80)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance1-70">
                              1 (KPS 70 or 80)
                            </label>
                          </div>
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="ecog-performance-4-20"
                              checked={ecogperformace === "4 (KPS 10 or 20)"}
                              value={"4 (KPS 10 or 20)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance-0-4-20">
                              4 (KPS 10 or 20)
                            </label>
                          </div>
                        </div>
                        <div className="chronic-mittal">
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="ecog-performance-2-50"
                              checked={ecogperformace === "2 (KPS 50 or 60)"}
                              value={"2 (KPS 50 or 60)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance-2-50">
                              2 (KPS 50 or 60)
                            </label>
                          </div>
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="ecog-performance-3-dead"
                              checked={ecogperformace === "5 (KPS 0 = dead)"}
                              value={"5 (KPS 0 = dead)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance-3-dead">
                              5 (KPS 0 = dead)
                            </label>
                          </div>
                        </div>
                        <div className="chronic-mittal">
                          <div></div>
                          <div>
                            <input
                              onKeyDown={handleKeyPress}
                              className="gap"
                              id="ecog-performance-2-50"
                              checked={ecogperformace === "NAV"}
                              value={"NAV"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance-2-50">
                              NAV
                            </label>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Tumor Stage</label>
                    </div>
                    <div className="col-sm-8">
                      <div className="">
                        <div className="d-subject">
                          <div className="chronic-mittal">
                            <div className="tumor-stage">
                              <input
                                onKeyDown={handleKeyPress}
                                className="gap"
                                required
                                id="tumor-stage-single"
                                checked={
                                  tumorStageValue ===
                                  "single(with or without microvascular invasion)"
                                }
                                value={
                                  "single(with or without microvascular invasion)"
                                }
                                onChange={(e) => setTumorStageValue(e.target.value)}
                                name="tumor-stage"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="tumor-stage-single"
                              >
                                Single(with or without microvascular invasion)
                              </label>
                            </div>
                            <div className="tumor-stage">
                              <input
                                onKeyDown={handleKeyPress}
                                className="gap"
                                id="tumor-stage-3tumors"
                                checked={
                                  tumorStageValue ===
                                  "3 tumors 3cm (≤ 3 tumors and none is > 3 cm with or without microvascular invasion)"
                                }
                                value={
                                  "3 tumors 3cm (≤ 3 tumors and none is > 3 cm with or without microvascular invasion)"
                                }
                                onChange={(e) => setTumorStageValue(e.target.value)}
                                name="tumor-stage"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="tumor-stage-3tumors"
                              >
                                {"3 tumors < 3cm (≤ 3 tumors and none is > 3 cm with or without microvascular invasion)"}
                              </label>
                            </div>
                            <div className="tumor-stage">
                              <input
                                onKeyDown={handleKeyPress}
                                className="gap"
                                id="tumor-stage-large"
                                checked={
                                  tumorStageValue ===
                                  "Large multinodular(> 3 tumors ≥2 tumors any larger than 3 cm with or without microvascular invasion )"
                                }
                                value={
                                  "Large multinodular(> 3 tumors ≥2 tumors any larger than 3 cm with or without microvascular invasion )"
                                }
                                onChange={(e) => setTumorStageValue(e.target.value)}
                                name="tumor-stage"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="tumor-stage-large"
                              >
                                {"Large multinodular(> 3 tumors or ≥2 tumors any larger than 3 cm with or without microvascular invasion )"}
                              </label>
                            </div>
                            <div className="tumor-stage">
                              <input
                                onKeyDown={handleKeyPress}
                                className="gap"
                                id="tumor-stage-vascular"
                                checked={
                                  tumorStageValue ===
                                  "Vascular invasion or extrahepatic spread (only macrovascular invasion of great vessels or mets)"
                                }
                                value={
                                  "Vascular invasion or extrahepatic spread (only macrovascular invasion of great vessels or mets)"
                                }
                                onChange={(e) => setTumorStageValue(e.target.value)}
                                name="tumor-stage"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="tumor-stage-vascular"
                              >
                                Vascular invasion or extrahepatic spread (only
                                macrovascular invasion of great vessels or mets)
                              </label>
                            </div>
                            <div className="tumor-stage">
                              <input
                                onKeyDown={handleKeyPress}
                                className="gap"
                                id="tumor-stage-any"
                                checked={tumorStageValue === "Any"}
                                value={"Any"}
                                onChange={(e) => setTumorStageValue(e.target.value)}
                                name="tumor-stage"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="tumor-stage-any"
                              >
                                Any
                              </label>
                            </div>
                            <div className="container-width-for-chronic">
                              <input
                                onKeyDown={handleKeyPress}
                                className="gap"
                                id="tumor-stage-any"
                                checked={tumorStageValue === "Not Available"}
                                value={"Not Available"}
                                onChange={(e) => setTumorStageValue(e.target.value)}
                                name="tumor-stage"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="tumor-stage-any"
                              >Not Available</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        Type of Vascular Invasion/Extrahepatic Spread
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <div className="">
                        <div className="d-subject">
                          <div className="chronic-mittal">
                            <div className="tumor-stage">
                              <input
                                onKeyDown={handleKeyPress}
                                className="gap"
                                required
                                id="vascular-invasion-macro"
                                checked={
                                  typeOfVascular ===
                                  "Macrovascular invasion: radiographic and vascular invasion based on large"
                                }
                                value={
                                  "Macrovascular invasion: radiographic and vascular invasion based on large"
                                }
                                onChange={(e) => setTypeOfVascular(e.target.value)}
                                name="type-of-vascular-invasion"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="vascular-invasion-macro"
                              >
                                Macrovascular invasion: radiographic and vascular
                                invasion based on large
                              </label>
                            </div>
                            <div className="tumor-stage">
                              <input
                                onKeyDown={handleKeyPress}
                                className="gap"
                                id="vascular-invasion-vessel"
                                checked={
                                  typeOfVascular ===
                                  "Vessel disease seen on imaging at the time of diagnosis.(Outside Milan)."
                                }
                                value={
                                  "Vessel disease seen on imaging at the time of diagnosis.(Outside Milan)."
                                }
                                onChange={(e) => setTypeOfVascular(e.target.value)}
                                name="type-of-vascular-invasion"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="vascular-invasion-vessel"
                              >
                                Vessel disease seen on imaging at the time of
                                diagnosis.(Outside Milan).
                              </label>
                            </div>
                            <div className="tumor-stage">
                              <input
                                onKeyDown={handleKeyPress}
                                className="gap"
                                id="vascular-invasion-extrahepatic"
                                checked={
                                  typeOfVascular ===
                                  "Extrahepatic spread(outside Milan)"
                                }
                                value={"Extrahepatic spread(outside Milan)"}
                                onChange={(e) => setTypeOfVascular(e.target.value)}
                                name="type-of-vascular-invasion"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="vascular-invasion-extrahepatic"
                              >
                                Extrahepatic spread(outside Milan)
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        Is Microvascular invasion present on histology? <br /> (fill only if macrovascular invasion is absent)
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          required
                          id="mircovascular-invasion-yes"
                          checked={microvascularInvasion === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setMicrovascularInvasion(e.target.value)}
                          name="microvascular-invasion-histology"
                          type="radio"
                        />
                        <label htmlFor="mircovascular-invasion-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="mircovascular-invasion-no"
                          checked={microvascularInvasion === "No"}
                          value={"No"}
                          onChange={(e) => setMicrovascularInvasion(e.target.value)}
                          name="microvascular-invasion-histology"
                          type="radio"
                        />
                        <label htmlFor="mircovascular-invasion-no">No</label>

                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="mircovascular-invasion-not-enough"
                          checked={
                            microvascularInvasion ===
                            "Not enough information from histology"
                          }
                          value={"Not enough information from histology"}
                          onChange={(e) => setMicrovascularInvasion(e.target.value)}
                          name="microvascular-invasion-histology"
                          type="radio"
                        />
                        <label htmlFor="mircovascular-invasion-not-enough">
                          Not enough information from histology
                        </label>
                        <br/>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="mircovascular-invasion-histology"
                          checked={
                            microvascularInvasion === "Histology is not available"
                          }
                          value={"Histology is not available"}
                          onChange={(e) => setMicrovascularInvasion(e.target.value)}
                          name="microvascular-invasion-histology"
                          type="radio"
                        />
                        <label htmlFor="mircovascular-invasion-histology">
                          Histology is not available
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        Tumor Within Milan Criteria
                      </label>
                    </div>
                    <div className="col-sm-8">
                      {/* <div className=""> */}
                      <div className="d-subject">
                        <div className="chronic-mittal">
                          <div className="tumor-stage1">
                            <input
                              onKeyDown={handleKeyPress}
                              required
                              id="tumor-widthin-milan-yes"
                              checked={
                                tumorWithinMilan ===
                                "Yes (single lesion 5 cm or less, OR up to 3 separate lesion none larger than 3 cm, AND Nomacroscopic vascular invasion or distant metastases): Microvascular invasion is OK"
                              }
                              value={
                                "Yes (single lesion 5 cm or less, OR up to 3 separate lesion none larger than 3 cm, AND Nomacroscopic vascular invasion or distant metastases): Microvascular invasion is OK"
                              }
                              onChange={(e) =>
                                setTumorWithinMilan(e.target.value)
                              }
                              name="Tumor within Milan"
                              className="chronicliver-ww"
                              type="radio"
                            />

                            <label htmlFor="tumor-widthin-milan-yes" className="mL10">
                              Yes (Single lesion 5 cm or less, OR up to 3 separate
                              lesion none larger than 3 cm, AND
                              <br />
                              Nomacroscopic vascular invasion or distant
                              metastases): Microvascular invasion is OK
                            </label>
                          </div>
                          <div className="tumor-stage1">
                            <input
                              onKeyDown={handleKeyPress}
                              id="tumor-widthin-milan-no"
                              checked={
                                tumorWithinMilan ===
                                "No (single lesion>5 cm, OR >3 separate lesions any larger than 3 cm, OR evidence of macroscopic vascular invasion or distant metastases)"
                              }
                              value={
                                "No (single lesion>5 cm, OR >3 separate lesions any larger than 3 cm, OR evidence of macroscopic vascular invasion or distant metastases)"
                              }
                              onChange={(e) =>
                                setTumorWithinMilan(e.target.value)
                              }
                              name="Tumor within Milan"
                              className="chronicliver-ww"
                              type="radio"
                            />
                            <label htmlFor="tumor-widthin-milan-no" className="mL10">
                              No (Single lesion>5 cm, OR >3 separate lesions any
                              larger than 3 cm, OR evidence of
                              <br /> macroscopic vascular invasion or distant
                              metastases)
                            </label>
                          </div>
                          <div className="tumor-stage1">
                            <input
                              onKeyDown={handleKeyPress}
                              id="tumor-widthin-milan-notenough"
                              checked={
                                tumorWithinMilan === "Not enough information"
                              }
                              value={"Not enough information"}
                              onChange={(e) =>
                                setTumorWithinMilan(e.target.value)
                              }
                              name="Tumor within Milan"
                              type="radio"
                            />
                            <label htmlFor="tumor-widthin-milan-notenough" className="mL10">
                              Not Enough Information
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        Child-Pugh Classfication(at time of diagnosis)
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          required
                          id="child-pugh-classifcation-child-a"
                          checked={childPughClassfication === "Child A"}
                          value={"Child A"}
                          onChange={(e) =>
                            setChildPughClassfication(e.target.value)
                          }
                          name="child-pugh-classifcation"
                          type="radio"
                        />
                        <label htmlFor="child-pugh-classifcation-child-a">
                          Child A
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="child-pugh-classifcation-child-ab"
                          checked={childPughClassfication === "Child A-B"}
                          value={"Child A-B"}
                          onChange={(e) =>
                            setChildPughClassfication(e.target.value)
                          }
                          name="child-pugh-classifcation"
                          type="radio"
                        />
                        <label htmlFor="child-pugh-classifcation-child-ab">
                          Child A-B
                        </label>

                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="child-pugh-classifcation-child-b"
                          checked={childPughClassfication === "Child B"}
                          value={"Child B"}
                          onChange={(e) =>
                            setChildPughClassfication(e.target.value)
                          }
                          name="child-pugh-classifcation"
                          type="radio"
                        />
                        <label htmlFor="child-pugh-classifcation-child-b">
                          Child B
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="child-pugh-classifcation-child-c"
                          checked={childPughClassfication === "Child C"}
                          value={"Child C"}
                          onChange={(e) =>
                            setChildPughClassfication(e.target.value)
                          }
                          name="child-pugh-classifcation"
                          type="radio"
                        />
                        <label htmlFor="child-pugh-classifcation-child-c">
                          Child C
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="child-pugh-classifcation-child-unknown"
                          checked={childPughClassfication === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) =>
                            setChildPughClassfication(e.target.value)
                          }
                          name="child-pugh-classifcation"
                          type="radio"
                        />
                        <label htmlFor="child-pugh-classifcation-child-unknown">
                          Unknown
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        Barcelona Clinic Liver Cancer (BCLC) Stage
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <div className="">
                        <div className="d-subject">
                          <div className="chronic-mittal">
                            <div className="tumor-stage1">
                              <input
                                onKeyDown={handleKeyPress}
                                required
                                id="barcelona-clinic-0"
                                checked={
                                  barcelonaClinic ===
                                  "Stage 0: Very early HCC (all criteria should be fulfilled)"
                                }
                                value={
                                  "Stage 0: Very early HCC (all criteria should be fulfilled)"
                                }
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-0" className="mL10 mt-2">
                                Stage 0: Very early HCC (all criteria should be
                                fulfilled)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                onKeyDown={handleKeyPress}
                                id="barcelona-clinic-stagea"
                                checked={
                                  barcelonaClinic ===
                                  "Stage A: early HCC (all criteria should be fulfilled)"
                                }
                                value={
                                  "Stage A: early HCC (all criteria should be fulfilled)"
                                }
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-stagea" className="mL10 mt-2">
                                Stage A: Early HCC (all criteria should be
                                fulfilled)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                onKeyDown={handleKeyPress}
                                id="barcelona-clinic-stageb"
                                checked={
                                  barcelonaClinic ===
                                  "Stage B: Intermediate HCC (all criteria should be fulfilled)"
                                }
                                value={
                                  "Stage B: Intermediate HCC (all criteria should be fulfilled)"
                                }
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-stageb" className="mL10 mt-2">
                                Stage B: Intermediate HCC (all criteria should be
                                Fulfilled)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                onKeyDown={handleKeyPress}
                                id="barcelona-clinic-stagec"
                                checked={
                                  barcelonaClinic ===
                                  "Stage C: advanced HCC(at least one criteria ECOG 1-2 or vascular invasion/extrahepatic spread)"
                                }
                                value={
                                  "Stage C: advanced HCC(at least one criteria ECOG 1-2 or vascular invasion/extrahepatic spread)"
                                }
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-stagec" className="mL10 mt-2">
                                Stage C: Advanced HCC(at least one criteria ECOG 1-2
                                or vascular invasion/extrahepatic spread)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                onKeyDown={handleKeyPress}
                                id="barcelona-clinic-staged"
                                checked={
                                  barcelonaClinic ===
                                  "Stage D: end-stage HCC(at least one criteria ECOG 3-4 or Child C)"
                                }
                                value={
                                  "Stage D: end-stage HCC(at least one criteria ECOG 3-4 or Child C)"
                                }
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-stagec" className="mL10 mt-2">
                                Stage D: End-stage HCC(at least one criteria ECOG
                                3-4 or Child C)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                onKeyDown={handleKeyPress}
                                id="barcelona-clinic-stage-not"
                                checked={
                                  barcelonaClinic ===
                                  "Not Available/cannot be calculated"
                                }
                                value={"Not Available/cannot be calculated"}
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-stage-not" className="mL10 mt-2">
                                Not Available/Cannot be Calculated
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
          {/* HCC Staging Container */}
          {/*======================== Chronic Liver disease Container ================*/}
          <div>
            <div className="study-container">
              <div className="studyData-container">
                <h1 className="study-txt">Chronic Liver Disease (CLD)Etiology</h1>
                <button
                  type="button"
                  onClick={chronicButtonHandle}
                  className="study-btn"
                >
                  {chronicButton ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </button>
              </div>
              <div className={chronicButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="container-width" style={{ width: '100%' }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is Fatty Liver Present?</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          className="screen-m"
                          required
                          id="cld-yes"
                          checked={fattyLiverCLD === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setFattyLiverCLD(e.target.value)}
                          name="fattyLiver"
                          type="radio"
                        />
                        <label htmlFor="cld-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="screen-m"
                          id="cld-no"
                          style={{ marginLeft: 10 }}
                          checked={fattyLiverCLD === "No"}
                          value={"No"}
                          onChange={(e) => setFattyLiverCLD(e.target.value)}
                          name="fattyLiver"
                          type="radio"
                        />
                        <label htmlFor="cld-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="screen-m"
                          id="cld-unknown"
                          style={{ marginLeft: 10 }}
                          checked={fattyLiverCLD === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => setFattyLiverCLD(e.target.value)}
                          name="fattyLiver"
                          type="radio"
                        />
                        <label htmlFor="cld-unknown">Unknown</label>
                      </div>
                    </div>

                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Fatty Liver Diagnostic Modality
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          className="chronicliver-ww margin-right-radio chronic-down"
                          value={"Imaging"}
                          checked={fattyLiverRadioLast === "Imaging"}
                          onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                          name="fatty-modality"
                          type="radio"
                        />
                        <label>Imaging</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="chronicliver-ww margin-right-radio chronic-down"
                          value={"Biopsy"}
                          style={{ marginLeft: 10 }}
                          checked={fattyLiverRadioLast === "Biopsy"}
                          onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                          name="fatty-modality"
                          type="radio"
                        />
                        <label>Biopsy</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="chronicliver-ww margin-right-radio chronic-down"
                          value={"Clinical"}
                          style={{ marginLeft: 10 }}
                          checked={fattyLiverRadioLast === "Clinical"}
                          onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                          name="fatty-modality"
                          type="radio"
                        />
                        <label>Clinical</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="chronicliver-ww margin-right-radio chronic-down"
                          value={"Other"}
                          style={{ marginLeft: 10 }}
                          checked={fattyLiverRadioLast === "Other"}
                          onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                          name="fatty-modality"
                          type="radio"
                        />
                        <label>Other</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="chronicliver-ww margin-right-radio chronic-down"
                          value={"NA"}
                          style={{ marginLeft: 10 }}
                          checked={fattyLiverRadioLast === "NA"}
                          onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                          name="fatty-modality"
                          type="radio"
                        />
                        <label>NA</label>
                      </div>
                    </div>

                    <div className="container-width" style={{ width: '100%' }}>
                      <div className="col-sm-4">
                        <label htmlFor="fatty-liver-diagnostic" className="label-txt" style={{ fontWeight: 600 }}>
                          Fatty Liver Diagnostic Modality Free Text
                        </label>
                      </div>
                      <textarea
                        onKeyDown={handleKeyPress}
                        required
                        maxLength={100}
                        rows={1}
                        id="fatty-liver-diagnostic"
                        value={fattyLiverDiagnosticFreeText}
                        onChange={(e) =>
                          setFattyLiverDiagnosticFreeText(e.target.value)
                        }
                        className="form-control"
                        type="text"
                      ></textarea>
                    </div>
                    <div className="container-width" style={{ width: '100%' }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Cirrhosis Status</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          required
                          id="cirrhosis-status-yes"
                          checked={cirrhosisStatusValue === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setCirrhosisStatusValue(e.target.value)}
                          name="cirrhosis-status-CLD"
                          type="radio"
                        />
                        <label className="cirrhosis" htmlFor="cirrhosis-status-yes">
                          Yes
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="cirrhosis-status-no"
                          checked={cirrhosisStatusValue === "No"}
                          value={"No"}
                          onChange={(e) => {
                            if (cirrhosisStatusValue === "Yes") {
                              setMittalCriteriaValue("");
                            } else {
                              setMittalCriteriaValue("");
                            }
                            setCirrhosisStatusValue(e.target.value);
                          }}
                          name="cirrhosis-status-CLD"
                          type="radio"
                        />

                        <label className="cirrhosis" htmlFor="cirrhosis-status-no">
                          No
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="gap"
                          id="cirrhosis-status-unknown"
                          checked={cirrhosisStatusValue === "Unknown/unclassified"}
                          value={"Unknown/unclassified"}
                          onChange={(e) => {
                            if (cirrhosisStatusValue === "Yes") {
                              setMittalCriteriaValue("");
                            } else {
                              setMittalCriteriaValue("");
                            }
                            setCirrhosisStatusValue(e.target.value);
                          }}
                          name="cirrhosis-status-CLD"
                          type="radio"
                        />
                        <label
                          className="cirrhosis"
                          htmlFor="cirrhosis-status-unknown"
                        >
                          Unknown/Unclassified
                        </label>
                      </div>
                    </div>
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Mittal's Criteria</label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required
                            id="mital-criteria-a"
                            disabled={cirrhosisStatusValue !== "Yes"}
                            checked={
                              mittalCriteriaValue ===
                              "level 1 evidence (very high probability) of no cirrhosis"
                            }
                            value={
                              "level 1 evidence (very high probability) of no cirrhosis"
                            }
                            onChange={(e) => setMittalCriteriaValue(e.target.value)}
                            name="mittal-criteria"
                            type="radio"
                          />
                          <label htmlFor="mital-criteria-a" className="mL10 mt-2">
                            (a) Level 1 Evidence (very high probability) of no Cirrhosis
                          </label>
                        </div>
                        <div className="mittal-bottom inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={cirrhosisStatusValue !== "Yes"}
                            id="mital-criteria-b"
                            checked={
                              mittalCriteriaValue ===
                              "level 2 evidence (high probability) of no cirrhosis, which lacks histology but is based on imaging and laboratory criteria"
                            }
                            value={
                              "level 2 evidence (high probability) of no cirrhosis, which lacks histology but is based on imaging and laboratory criteria"
                            }
                            onChange={(e) => setMittalCriteriaValue(e.target.value)}
                            name="mittal-criteria"
                            type="radio"
                          />
                          <label htmlFor="mital-criteria-b" className="mL10 mt-2">
                            (b) Level 2 Evidence (high probability) of no cirrhosis,
                            which lacks histology but is based on imaging and
                            laboratory criteria
                          </label>
                        </div>
                        <div className="mittal-bottom inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={cirrhosisStatusValue !== "Yes"}
                            id="mital-criteria-c"
                            checked={
                              mittalCriteriaValue ===
                              "confirmed cirrhosis, which is based on histological, imaging, clinical or laboratory criteria"
                            }
                            value={
                              "confirmed cirrhosis, which is based on histological, imaging, clinical or laboratory criteria"
                            }
                            onChange={(e) => setMittalCriteriaValue(e.target.value)}
                            name="mittal-criteria"
                            type="radio"
                          />
                          <label htmlFor="mital-criteria-c" className="mL10 mt-2">
                            (c) Confirmed Cirrhosis, Which is based on Histological,
                            Imaging, Clinical or Laboratory Criteria
                          </label>
                        </div>
                        <div className="mittal-bottom inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={
                              cirrhosisStatusValue !== "Unknown/unclassified"
                            }
                            id="mital-criteria-d"
                            checked={
                              mittalCriteriaValue ===
                              "*Unclassified (insufficient data to classify into any of the above cirhosisi categories)"
                            }
                            value={
                              "*Unclassified (insufficient data to classify into any of the above cirhosisi categories)"
                            }
                            onChange={(e) => setMittalCriteriaValue(e.target.value)}
                            name="mittal-criteria"
                            type="radio"
                          />
                          <label htmlFor="mital-criteria-d" className="mL10 mt-2">
                            (d) *Unclassified (insufficient data to classify into
                            any of the above cirrhosis categories)
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Underlying Etiology</label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!underlyingEtiologyValue.length}
                            id="underlying-hcv"
                            checked={underlyingEtiologyValue.includes(
                              "HCV (Hepatitis C virus)"
                            )}
                            // value={"HCV (Hepatitis C virus)"}
                            onChange={() =>
                              handleUnderlyingEtiology("HCV (Hepatitis C virus)")
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-hcv" className="mL5">
                            HCV (Hepatitis C virus)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-hbv"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "HBV (Hepatitis B virus)"
                            )}
                            // value={"HBV (Hepatitis B virus)"}
                            onChange={() =>
                              handleUnderlyingEtiology("HBV (Hepatitis B virus)")
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-hbv" className="mL5">
                            HBV (Hepatitis B virus)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-alcohol"
                            checked={underlyingEtiologyValue.includes("Alcohol")}
                            required={!underlyingEtiologyValue.length}
                            // value={"Alcohol"}
                            onChange={() => handleUnderlyingEtiology("Alcohol")}
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-alcohol" className="mL5">Alcohol</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-nafld"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "NAFLD (Non-alcoholic fatty liver disease)"
                            )}
                            // value={"NAFLD (Non-alcoholic fatty liver disease)"}
                            onChange={() =>
                              handleUnderlyingEtiology(
                                "NAFLD (Non-alcoholic fatty liver disease)"
                              )
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-nafld" className="mL5">
                            NAFLD (Non-alcoholic fatty liver disease)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-aih"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "AIH (Autoimmune hepatitis)"
                            )}
                            // value={"AIH (Autoimmune hepatitis)"}
                            onChange={() =>
                              handleUnderlyingEtiology("AIH (Autoimmune hepatitis)")
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-aih" className="mL5">
                            AIH (Autoimmune hepatitis)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-pbc"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "PBC (Primary biliary cholangitis/Primary biliary cirrhosis)"
                            )}
                            // value={
                            //   "PBC (Primary biliary cholangitis/Primary biliary cirrhosis)"
                            // }
                            onChange={() =>
                              handleUnderlyingEtiology(
                                "PBC (Primary biliary cholangitis/Primary biliary cirrhosis)"
                              )
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-pbc" className="mL5">
                            PBC (Primary biliary cholangitis/Primary biliary
                            cirrhosis)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-psc"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "PSC (Primary sclerosing cholangitis)"
                            )}
                            // value={"PSC (Primary sclerosing cholangitis)"}
                            onChange={() =>
                              handleUnderlyingEtiology(
                                "PSC (Primary sclerosing cholangitis)"
                              )
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-psc" className="mL5">
                            PSC (Primary sclerosing cholangitis)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-hemochromatosis"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "Hemochromatosis"
                            )}
                            // value={"Hemochromatosis"}
                            onChange={() =>
                              handleUnderlyingEtiology("Hemochromatosis")
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-hemochromatosis" className="mL5">
                            Hemochromatosis
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-alpha-1"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "Alpha 1 antitrypsin deficiency"
                            )}
                            // value={"Alpha 1 antitrypsin deficiency"}
                            onChange={() =>
                              handleUnderlyingEtiology(
                                "Alpha 1 antitrypsin deficiency"
                              )
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-alpha-1" className="mL5">
                            Alpha 1 antitrypsin deficiency
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-other-etiologies"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "Other etiologie"
                            )}
                            // value={"Other etiologie"}
                            onChange={() =>
                              handleUnderlyingEtiology("Other etiologie")
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-other-etiologies" className="mL5">
                            Other etiologies
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-idiopathic"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "Idiopathic (enougth information but no obviouse etiology)"
                            )}
                            // value={
                            //   "Idiopathic (enougth information but no obviouse etiology)"
                            // }
                            onChange={() =>
                              handleUnderlyingEtiology(
                                "Idiopathic (enougth information but no obviouse etiology)"
                              )
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-idiopathic" className="mL5">
                            Idiopathic (enough information but no obvious
                            etiology)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="underlying-unknown"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "Unknown etiology(not enough information)"
                            )}
                            // value={"Unknown etiology(not enough information)"}
                            onChange={() =>
                              handleUnderlyingEtiology(
                                "Unknown etiology(not enough information)"
                              )
                            }
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          {/* {console.log(underlyingEtiologyValue)} */}
                          <label htmlFor="underlying-unknown" className="mL5">
                            Unknown etiology(not enough information)
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%' }}>
                      <div className="col-sm-4">
                        <label htmlFor="etiology-cirrhosis" className="label-txt" style={{ fontWeight: 600 }}>
                          Etiology of Cirrhosis Free Text
                        </label>
                      </div>
                      <textarea
                        onKeyDown={handleKeyPress}
                        required
                        maxLength={100}
                        rows={1}
                        id="etiology-cirrhosis"
                        value={etiologyCirrhosisFreeValue}
                        onChange={(e) =>
                          setEtiologyCirrhosisFreeValue(e.target.value)
                        }
                        type="text"
                        className="form-control"
                      ></textarea>
                    </div>
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Complications (at the time of HCC diagnosis)
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!complicationCLD.length}
                            id="complications-ascites"
                            checked={complicationCLD.includes("Ascites")}
                            // value={"Ascites"}
                            onChange={() => handleComplicationCLD("Ascites")}
                            name="complication"
                            type="checkbox"
                          />
                          <label htmlFor="complications-ascites" className="mL5">Ascites</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="complications-encep"
                            required={!complicationCLD.length}
                            checked={complicationCLD.includes("Encephalopathy")}
                            // value={"Encephalopathy"}
                            onChange={() => handleComplicationCLD("Encephalopathy")}
                            name="complication"
                            type="checkbox"
                          />
                          <label htmlFor="complications-encep" className="mL5">
                            Encephalopathy
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!complicationCLD.length}
                            id="complications-varices"
                            checked={complicationCLD.includes("Varices")}
                            // value={"Varices"}
                            onChange={() => handleComplicationCLD("Varices")}
                            name="complication"
                            type="checkbox"
                          />
                          <label htmlFor="complications-varices" className="mL5">Varices</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="complications-sbp"
                            required={!complicationCLD.length}
                            checked={complicationCLD.includes(
                              "SBP (Spontaneous Bacteria Peritonitis)"
                            )}
                            // value={"SBP (Spontaneous Bacteria Peritonitis)"}
                            onChange={() =>
                              handleComplicationCLD(
                                "SBP (Spontaneous Bacteria Peritonitis)"
                              )
                            }
                            name="complication"
                            type="checkbox"
                          />
                          <label htmlFor="complications-sbp" className="mL5">
                          SBP (Spontaneous Bacterial Peritonitis)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="complications-other"
                            required={!complicationCLD.length}
                            checked={complicationCLD.includes(
                              "Other (renal failure, etc)"
                            )}
                            // value={"Other (renal failure, etc)"}
                            onChange={() =>
                              handleComplicationCLD("Other (renal failure, etc)")
                            }
                            name="complication"
                            type="checkbox"
                          />
                          <label htmlFor="complications-other" className="mL5">
                            Other (renal failure, etc)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="complications-no-complication"
                            required={!complicationCLD.length}
                            checked={complicationCLD.includes(
                              "No complications occurred"
                            )}
                            // value={"No complications occurred"}
                            onChange={() =>
                              handleComplicationCLD("No complications occurred")
                            }
                            name="complication"
                            type="checkbox"
                          />
                          <label htmlFor="complications-no-complication" className="mL5">
                            No complications occurred
                          </label>
                        </div>
                        <div className="mittal-bottom inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            id="complications-information"
                            required={!complicationCLD.length}
                            checked={complicationCLD.includes(
                              "Information not availabel or not applicable (Patient not cirrhosis)"
                            )}
                            // value={
                            //   "Information not availabel or not applicable (Patient not cirrhosis)"
                            // }
                            onChange={() =>
                              handleComplicationCLD(
                                "Information not availabel or not applicable (Patient not cirrhosis)"
                              )
                            }
                            name="complication"
                            type="checkbox"
                          />
                          <label htmlFor="complications-information" className="mL5">
                            Information not availabel or not applicable (Patient not
                            cirrhosis)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="complications-portal"
                            required={!complicationCLD.length}
                            checked={complicationCLD.includes(
                              "Portal vein thrombosis"
                            )}
                            // value={"Portal vein thrombosis"}
                            onChange={() =>
                              handleComplicationCLD("Portal vein thrombosis")
                            }
                            name="complication"
                            type="checkbox"
                          />
                          <label htmlFor="complications-portal" className="mL5">
                            Portal vein thrombosis
                          </label>
                          {/* {// console.log(complicationCLD)} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //////// */}

                  <div>{/* ======================= */}</div>
                </Fade>
                {/* /////////// */}
              </div>
            </div>
          </div>
          {/* HCC Container */}
          <div className="study-container">
            <div className="studyData-container">
              <h1 className="study-txt">HCC Outcomes</h1>
              <button
                type="button"
                onClick={hccOutcomeButtonHandle}
                className="study-btn"
              >
                {hccOutcome ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </button>
            </div>
            <div className={hccOutcome ? "study-data" : ""}>
              <Fade>
                <div className="card p-3">
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Treatment Modalities</label>
                    </div>
                    <div className="cols-m-8">
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          required={!hccOutcomeValue.length}
                          id="hcc-resection"
                          checked={hccOutcomeValue.includes("Resection")}
                          // value={"Resection"}
                          onChange={() => handleHccOutComeValue("Resection")}
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-resection" className="mL5">Resection</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcc-liver-transplatation"
                          required={!hccOutcomeValue.length}
                          checked={hccOutcomeValue.includes(
                            "Liver transplantation"
                          )}
                          // value={"Liver transplantation"}
                          onChange={() =>
                            handleHccOutComeValue("Liver transplantation")
                          }
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-liver-transplatation" className="mL5">
                          Liver Transplantation
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcc-catheter"
                          required={!hccOutcomeValue.length}
                          checked={hccOutcomeValue.includes(
                            "Catheter delivered therapy (y90, TACE, radioembolizationetc)"
                          )}
                          // value={
                          //   "Catheter delivered therapy (y90, TACE, radioembolizationetc)"
                          // }
                          onChange={() =>
                            handleHccOutComeValue(
                              "Catheter delivered therapy (y90, TACE, radioembolizationetc)"
                            )
                          }
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-catheter" className="mL5">
                          Catheter delivered therapy (y90, TACE, radioembolization,etc)
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcc-sorafenib"
                          required={!hccOutcomeValue.length}
                          checked={hccOutcomeValue.includes("Sorafenib")}
                          // value={"Sorafenib"}
                          onChange={() => handleHccOutComeValue("Sorafenib")}
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-sorafenib" className="mL5">Sorafenib</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcc-radiation"
                          required={!hccOutcomeValue.length}
                          checked={hccOutcomeValue.includes("Radiation(SBRT)")}
                          // value={"Radiation(SBRT)"}
                          onChange={() => handleHccOutComeValue("Radiation(SBRT)")}
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-radiation" className="mL5">Radiation(SBRT)</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcc-rfa"
                          required={!hccOutcomeValue.length}
                          checked={hccOutcomeValue.includes("RFA ablation")}
                          // value={"RFA ablation"}
                          onChange={() => handleHccOutComeValue("RFA ablation")}
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-rfa" className="mL5">RFA Ablation</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcc-palliative"
                          required={!hccOutcomeValue.length}
                          checked={hccOutcomeValue.includes(
                            "Palliative/hospice care"
                          )}
                          // value={"Palliative/hospice care"}
                          onChange={() =>
                            handleHccOutComeValue("Palliative/hospice care")
                          }
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-palliative" className="mL5">
                          Palliative/Hospice care
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcc-other"
                          required={!hccOutcomeValue.length}
                          checked={hccOutcomeValue.includes(
                            "Other (specify in freetext)"
                          )}
                          // value={"Other (specify in freetext)"}
                          name="treatment-modalities-hcc"
                          onChange={() => {
                            handleHccOutComeValue("Other (specify in freetext)");
                            setTreamentModalitiesHCC("");
                          }}
                          type="checkbox"
                        />
                        <label htmlFor="hcc-other" className="mL5">
                          Other (specify in freetext)
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcc-none"
                          required={!hccOutcomeValue.length}
                          checked={hccOutcomeValue.includes(
                            "None (if patient was too sick, refused treatment,etc.)"
                          )}
                          // value={
                          //   "None (if patient was too sick, refused treatment,etc.)"
                          // }
                          onChange={() => {
                            handleHccOutComeValue(
                              "None (if patient was too sick, refused treatment,etc.)"
                            );
                          }}
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-none" className="mL5">
                          None (if patient was too sick, refused treatment,etc.)
                        </label>
                      </div>
                      <div className="mittal-bottom inlineFlex">
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcc-unknown"
                          required={!hccOutcomeValue.length}
                          checked={hccOutcomeValue.includes(
                            "Unknown (if patient was lost to follow-up or information not available in the chart)"
                          )}
                          // value={
                          //   "Unknown (if patient was lost to follow-up or information not available in the chart)"
                          // }
                          onChange={() =>
                            handleHccOutComeValue(
                              "Unknown (if patient was lost to follow-up or information not available in the chart)"
                            )
                          }
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-unknown" className="mL5">
                          Unknown (if patient was lost to follow-up or information
                          not available in the chart)
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcc-microwave"
                          required={!hccOutcomeValue.length}
                          checked={hccOutcomeValue.includes("Microwave ablation")}
                          // value={"Microwave ablation"}
                          onChange={() =>
                            handleHccOutComeValue("Microwave ablation")
                          }
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-microwave" className="mL5">Microwave ablation</label>
                      </div>
                    </div>
                  </div>
                  <div className="container-width" style={{ width: '100%' }}>
                    <div className="col-sm-4">
                      <label htmlFor="treatment-explain-free" className="label-txt" style={{ fontWeight: 600 }}>
                        Treatment Modalities Explanation(free text)
                      </label>
                    </div>
                    <textarea
                      onKeyDown={handleKeyPress}
                      required
                      disabled={
                        !hccOutcomeValue.includes("Other (specify in freetext)")
                      }
                      maxLength={100}
                      id="treatment-explain-free"
                      value={treamentModalitiesHCC}
                      onChange={(e) => setTreamentModalitiesHCC(e.target.value)}
                      type="text"
                      rows={1}
                      className="form-control"
                    ></textarea>
                  </div>
                  <div>
                    <h1 style={{fontSize: 14}}>If resection was performed:</h1>
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Stage of Fibrosis in Background Liver
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required
                            disabled={!hccOutcomeValue.includes("Resection")}
                            id="hcc-performed-none"
                            checked={resectionPerformed === "None/F0"}
                            value={"None/F0"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-none" className="mL5">None/F0</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcc-performed-mild"
                            disabled={!hccOutcomeValue.includes("Resection")}
                            checked={resectionPerformed === "Mild/stage 1/F1"}
                            value={"Mild/stage 1/F1"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-mild" className="mL5">
                            Mild/Stage 1/F1
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcc-performed-moderate"
                            disabled={!hccOutcomeValue.includes("Resection")}
                            checked={resectionPerformed === "Moderate/stage 2/F2"}
                            value={"Moderate/stage 2/F2"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-moderate" className="mL5">
                            Moderate/Stage 2/F2
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcc-performed-bridiging"
                            disabled={!hccOutcomeValue.includes("Resection")}
                            checked={
                              resectionPerformed === "Bridiging fibrosis/stage 3F3"
                            }
                            value={"Bridiging fibrosis/stage 3F3"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-bridiging" className="mL5">
                            Brdiging fibrosis/stage 3/F3
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcc-performed-cirrhosis"
                            disabled={!hccOutcomeValue.includes("Resection")}
                            checked={resectionPerformed === "Cirrhosis/stage 4/F4"}
                            value={"Cirrhosis/stage 4/F4"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-cirrhosis" className="mL5">
                            Cirrhosis/Stage 4/F4
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcc-performed-unknown"
                            disabled={!hccOutcomeValue.includes("Resection")}
                            checked={resectionPerformed === "Unknown"}
                            value={"Unknown"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-unknown" className="mL5">Unknown</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 style={{fontSize: 14}}>
                      If liver transplant was performed:
                    </h1>
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Stage of Fibrosis in Explanted Liver
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required
                            id="liver-transplant-none"
                            disabled={
                              !hccOutcomeValue.includes("Liver transplantation")
                            }
                            checked={liverTransplantValue === "None/F0"}
                            value={"None/F0"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            name="explanted liver"
                            type="radio"
                          />
                          <label htmlFor="liver-transplant" className="mL5">None/F0</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="liver-transplant-mild"
                            disabled={
                              !hccOutcomeValue.includes("Liver transplantation")
                            }
                            checked={liverTransplantValue === "Mild/stage 1/F1"}
                            value={"Mild/stage 1/F1"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            name="explanted liver"
                            type="radio"
                          />
                          <label htmlFor="liver-transplant-mild" className="mL5">
                            Mild/Stage 1/F1
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="liver-transplant-moderate"
                            disabled={
                              !hccOutcomeValue.includes("Liver transplantation")
                            }
                            checked={liverTransplantValue === "Moderate/stage 2/F2"}
                            value={"Moderate/stage 2/F2"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            name="explanted liver"
                            type="radio"
                          />
                          <label htmlFor="liver-transplant-moderate" className="mL5">
                            Moderate/Stage 2/F2
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="liver-transplant-bridiging"
                            disabled={
                              !hccOutcomeValue.includes("Liver transplantation")
                            }
                            checked={
                              liverTransplantValue ===
                              "Bridiging fibrosis/stage 3F3"
                            }
                            value={"Bridiging fibrosis/stage 3F3"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            name="explanted liver"
                            type="radio"
                          />
                          <label htmlFor="liver-transplant-bridiging" className="mL5">
                            Bridiging Fibrosis/Stage 3F3
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="liver-transplant-cirrhosis"
                            disabled={
                              !hccOutcomeValue.includes("Liver transplantation")
                            }
                            checked={
                              liverTransplantValue === "Cirrhosis/stage 4/F4"
                            }
                            value={"Cirrhosis/stage 4/F4"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            name="explanted liver"
                            type="radio"
                          />
                          <label htmlFor="liver-transplant-cirrhosis" className="mL5">
                            Cirrhosis/Stage 4/F4
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="liver-transplant-unknown"
                            disabled={
                              !hccOutcomeValue.includes("Liver transplantation")
                            }
                            checked={liverTransplantValue === "Unknown"}
                            value={"Unknown"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            name="explanted liver"
                            type="radio"
                          />
                          <label htmlFor="liver-transplant-unknown" className="mL5">Unknown</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Recurrence ?</label>
                    </div>
                    <div className="col-sm-8">
                      {/* <div className="gaps-recurrence"> */}
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        className="margin-right-radio"
                        id="recurrence-yes"
                        checked={recurrenceValue === "Yes once"}
                        value={"Yes once"}
                        onChange={(e) => setRecurrenceValue(e.target.value)}
                        name="Recurrence"
                        type="radio"
                      />
                      <label htmlFor="recurrence-yes">Yes Once</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="margin-right-radio"
                        style={{ marginLeft: 10 }}
                        id="recurrence-yes-more"
                        checked={recurrenceValue === "Yes more than once"}
                        value={"Yes more than once"}
                        onChange={(e) => {
                          if (recurrenceValue === "No") {
                            setSelectedDateOfFirstRecurrence("");
                          } else {
                            setSelectedDateOfFirstRecurrence("");
                          }
                          setRecurrenceValue(e.target.value);
                        }}
                        name="Recurrence"
                        type="radio"
                      />
                      <label htmlFor="recurrence-yes-more">
                        Yes More Than Once
                      </label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="margin-right-radio"
                        id="recurrence-no"
                        style={{ marginLeft: 10 }}
                        checked={recurrenceValue === "No"}
                        value={"No"}
                        onChange={(e) => {
                          if (recurrenceValue === "No") {
                            setSelectedDateOfFirstRecurrence("");
                          } else {
                            setSelectedDateOfFirstRecurrence("");
                          }
                          setRecurrenceValue(e.target.value);
                        }}
                        name="Recurrence"
                        type="radio"
                      />
                      <label htmlFor="recurrence-no">No</label>
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          className="margin-right-radio"
                          // style={{ marginLeft: 10 }}
                          id="recurrence-unknown"
                          checked={recurrenceValue === "Unknown/patient no"}
                          value={"Unknown/patient no"}
                          onChange={(e) => {
                            if (recurrenceValue === "No") {
                              setSelectedDateOfFirstRecurrence("");
                            } else {
                              setSelectedDateOfFirstRecurrence("");
                            }
                            setRecurrenceValue(e.target.value);
                          }}
                          name="Recurrence"
                          type="radio"
                        />
                        <label htmlFor="recurrence-unknown">
                          Unknown/Patient Not cured
                        </label>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="d-subject" style={{ width: '100%' }}>
                    <div className="container-width" style={{ width: '100%' }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Date of First Recurrence</label></div>
                      <div className="col-sm-3">
                        <input
                          onKeyDown={handleKeyPress}
                          required={recurrenceValue === "Yes once"}
                          disabled={recurrenceValue !== "Yes once" && recurrenceValue !== "Yes more than once"}
                          type="date"
                          value={selectedDateOfFirstRecurrence}
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            setSelectedDateOfFirstRecurrence(formattedDate);
                          }}
                          className="form-control"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={selectedDateOfFirstRecurrence}
                          disabled={recurrenceValue !== "Yes once" && recurrenceValue !== "Yes more than once"}
                          onChange={date => setSelectedDateOfFirstRecurrence(date)}
                          startDate={selectedDateOfFirstRecurrence}
                          dateFormat={'dd/MMM/yyyy'}
                          className="form-control date"
                          placeholderText="DD/MMM/YYYY"
                        /> */}
                        <label style={{ color: 'black' }}>(First recurrence only)</label>
                      </div>
                    </div>
                  </div>
                  <div className="container-width" style={{ width: '100%' }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Survival Status</label>
                    </div>
                    <div className="col-sm-8">
                      {/* <div className="container-width"> */}
                      <input
                        onKeyDown={handleKeyPress}
                        className="margin-right-radio"
                        required
                        id="survival-status-alive"
                        checked={survivalStatusValue === "Alive"}
                        value={"Alive"}
                        onChange={(e) => {
                          if (survivalStatusValue === "Deceased") {
                            setSelectedDateOfDeath("");
                            setDateOfDeathUnkown("");
                          } else {
                            setSelectedDateOfDeath("");
                            setDateOfDeathUnkown("");
                          }
                          setSurvivalStatusValue(e.target.value);
                        }}
                        name="survival status"
                        type="radio"
                      />
                      <label htmlFor="survival-status-alive">Alive</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="margin-right-radio"
                        style={{ marginLeft: 10 }}
                        id="survival-status-deceased"
                        checked={survivalStatusValue === "Deceased"}
                        value={"Deceased"}
                        onChange={(e) => {
                          if (survivalStatusValue === "Deceased") {
                            setDateOfDeathUnkown("");
                          } else {
                            setDateOfDeathUnkown("");
                          }
                          setSurvivalStatusValue(e.target.value);
                        }}
                        name="survival status"
                        type="radio"
                      />
                      <label htmlFor="survival-status-deceased">Deceased</label>
                      <input
                        onKeyDown={handleKeyPress}
                        className="margin-right-radio"
                        id="survival-status-unknown"
                        style={{ marginLeft: 10 }}
                        checked={survivalStatusValue === "Unknown"}
                        value={"Unknown"}
                        onChange={(e) => {
                          if (survivalStatusValue === "Deceased") {
                            setSelectedDateOfDeath("");
                            setDateOfDeathUnkown("");
                          } else {
                            setSelectedDateOfDeath("");
                            setDateOfDeathUnkown("");
                          }
                          setSurvivalStatusValue(e.target.value);
                        }}
                        name="survival status"
                        type="radio"
                      />
                      <label htmlFor="survival-status-unknown">Unknown</label>
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="d-subject" style={{ width: '100%' }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Date of Death</label>
                    </div>
                    <div className="container-width" style={{ display: 'inline-flex' }}>
                      <input
                        onKeyDown={handleKeyPress}
                        required={survivalStatusValue === "Deceased"}
                        disabled={
                          survivalStatusValue !== "Deceased" ||
                          dateOfDeathUnknown === "Unknown"
                        }
                        type="date"
                        value={selectedDateOfDeath}
                        onChange={(e) => {
                          const inputDate = e.target.value;
                          const [year, month, day] = inputDate.split("-");
                          const limitedYear = year.slice(0, 4);
                          const formattedDate = `${limitedYear}-${month}-${day}`;
                          setSelectedDateOfDeath(formattedDate);
                        }}
                        className="form-control"
                        style={{height: 'fit-content'}}
                      />
                      {/* <DatePicker
                        wrapperClassName='w-full'
                        selected={selectedDateOfDeath}
                        disabled={
                          survivalStatusValue !== "Deceased" ||
                          dateOfDeathUnknown === "Unknown"
                        }
                        onChange={date => setSelectedDateOfDeath(date)}
                        startDate={selectedDateOfDeath}
                        dateFormat={'dd/MMM/yyyy'}
                        className="form-control date"
                        placeholderText="DD/MMM/YYYY"
                      /> */}
                      <label style={{ marginLeft: 20, marginTop: 5 }}>or</label>
                      <input
                        onKeyDown={handleKeyPress}
                        value={"Unknown"}
                        style={{ marginLeft: 20, marginTop: 10 }}
                        checked={dateOfDeathUnknown === "Unknown"}
                        disabled={
                          survivalStatusValue !== "Deceased" ||
                          dateOfDeathUnknown === "Unknown"
                        }
                        onChange={(e) => {
                          if (dateOfDeathUnknown === "Unknown") {
                            // setSelectedDateOfDeath("");
                            // setSurvivalStatusValue("");
                          } else {
                            setSelectedDateOfDeath("");
                            // setSurvivalStatusValue("");
                          }
                          setDateOfDeathUnkown(e.target.value);
                        }}
                        className="chronicliver-ww1"
                        type="radio"
                      />
                      <label style={{marginTop: 5, marginLeft: 5}}>Unknown</label>
                    </div>
                  </div>
                  <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Date of last contact (if patient is alive or dead
                        but unknown date of death)</label>
                    </div>
                    <div className="col-sm-3">
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        type="date"
                        disabled={lastContactUnknown === "Unknown"}
                        value={selectedDateOfLastContact}
                        onChange={(e) => {
                          const inputDate = e.target.value;
                          const [year, month, day] = inputDate.split("-");
                          const limitedYear = year.slice(0, 4);
                          const formattedDate = `${limitedYear}-${month}-${day}`;
                          setSelectedDateOfLastContact(formattedDate);
                        }}
                        className="form-control"
                      />
                      {/* <DatePicker
                        wrapperClassName='w-full'
                        selected={selectedDateOfLastContact}
                        disabled={lastContactUnknown === "Unknown"}
                        onChange={date => setSelectedDateOfLastContact(date)}
                        startDate={selectedDateOfLastContact}
                        dateFormat={'dd/MMM/yyyy'}
                        className="form-control date"
                        placeholderText="DD/MMM/YYYY"
                      /> */}
                    </div>
                    <label style={{ marginLeft: 20 }}>or</label>
                    <input
                      onKeyDown={handleKeyPress}
                      style={{marginTop: 5}}
                      value={"Unknown"}
                      style={{ marginLeft: 20 }}
                      checked={lastContactUnknown === "Unknown"}
                      onChange={(e) => {
                        if (lastContactUnknown === "Unknown") {
                          setSelectedDateOfLastContact("");
                        } else {
                          setSelectedDateOfLastContact("");
                        }
                        setLastContactUnknown(e.target.value);
                      }}
                      className="chronicliver-ww1"
                      type="radio"
                    />
                    <label className="mL5 mt-2">Unknown</label>
                  </div>
                  <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        Recurrence-free Survival(days)
                      </label>
                    </div>
                    <div className="container-width">
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        // min={1}
                        // max={999}
                        type="text"
                        value={selectedDateOfRecurrenceFree}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,3}$/.test(inputValue)) {
                            setSelectedDateOfRecurrenceFree(e.target.value);
                          }
                        }}
                        className="form-control"
                      />
                    </div>
                    <label style={{ color: 'black', marginLeft:"7px" }}>
                      (Date of first resection or liver transplant to date of first
                      recurrenct)
                    </label>
                  </div>
                  <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Overall Survival(days)</label>
                    </div>
                    <div className="container-width">
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        // min={1}
                        // max={999}
                        type="text"
                        value={selectedDateOfOverallSurvival}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,3}$/.test(inputValue)) {
                            setSelectedDateOfOverallSurvival(e.target.value);
                          }
                        }}
                        className="form-control"
                      />
                    </div>
                    <label style={{ color: 'black', marginLeft:"7px" }}>
                      (Date of first resection or liver transplant to date of first
                      recurrenct)
                    </label>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
          {/* HCC Container */}

          {/* Screening Questions Container*/}
          <div className="study-container">
            <div className="studyData-container">
              <h1 className="study-txt">Screening Questions</h1>
              <button
                type="button"
                onClick={screeningQesButtonHandle}
                className="study-btn"
              >
                {screenQuestion ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </button>
            </div>
            <div className={screenQuestion ? "study-data" : ""}>
              <Fade>
                <div className="card p-3">
                  <div>
                    {/* <h1 className="sub-section-txt">Screening Question</h1> */}
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          How was the HCC Diagnosed?
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            className="screen-m"
                            onKeyDown={handleKeyPress}
                            required
                            id="screen-question-part"
                            checked={screeningQuestion === "Part of screening"}
                            value={"Part of screening"}
                            onChange={(e) => {
                              if (screeningQuestion === "Other") {
                                setScreeningQuestionNa("");
                              } else {
                                setScreeningQuestionNa("");
                              }
                              setScreeningQuestionValue(e.target.value);
                            }}
                            name="screen question"
                            type="radio"
                          />
                          <label htmlFor="screen-question-part">
                            Part of Screening
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                          className="screen-m"
                            onKeyDown={handleKeyPress}
                            id="screen-question-incidental"
                            checked={screeningQuestion === "Incidental"}
                            value={"Incidental"}
                            onChange={(e) => {
                              if (screeningQuestion === "Other") {
                                setScreeningQuestionNa("");
                              } else {
                                setScreeningQuestionNa("");
                              }
                              setScreeningQuestionValue(e.target.value);
                            }}
                            name="screen question"
                            type="radio"
                          />
                          <label htmlFor="screen-question-incidental">
                            Incidental
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                          className="screen-m"
                            onKeyDown={handleKeyPress}
                            id="screen-question-symptoms"
                            checked={screeningQuestion === "Symptoms work-up"}
                            value={"Symptoms work-up"}
                            onChange={(e) => {
                              if (screeningQuestion === "Other") {
                                setScreeningQuestionNa("");
                              } else {
                                setScreeningQuestionNa("");
                              }
                              setScreeningQuestionValue(e.target.value);
                            }}
                            name="screen question"
                            type="radio"
                          />
                          <label htmlFor="screen-question-symptoms">
                            Symptoms Work-up
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                          className="screen-m"
                            onKeyDown={handleKeyPress}
                            id="screen-question-na"
                            checked={screeningQuestion === "NA/Unknown"}
                            value={"NA/Unknown"}
                            onChange={(e) => {
                              if (screeningQuestion === "Other") {
                                setScreeningQuestionNa("");
                              } else {
                                setScreeningQuestionNa("");
                              }
                              setScreeningQuestionValue(e.target.value);
                            }}
                            name="screen question"
                            type="radio"
                          />
                          <label htmlFor="screen-question-na">Unknown</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                          className="screen-m"
                            onKeyDown={handleKeyPress}
                            id="screen-question-other"
                            checked={screeningQuestion === "Other"}
                            value={"Other"}
                            onChange={(e) => {
                              setScreeningQuestionValue(e.target.value);
                            }}
                            name="screen question"
                            type="radio"
                          />
                          <label htmlFor="screen-question-other">Other, If Others, Pls Specify</label>
                          <textarea
                            onKeyDown={handleKeyPress}
                            maxLength={50}
                            rows={1}
                            required={screeningQuestion === "Other"}
                            disabled={screeningQuestion !== "Other"}
                            value={screeningQuestionNa}
                            onChange={(e) => setScreeningQuestionNa(e.target.value)}
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Any Method of Screening <br/>Found 
                          within 2 Years Before HCC diagnosis?
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          value={"Yes"}
                          checked={screening2Years === "Yes"}
                          onChange={(e) => setScreening2Years(e.target.value)}
                          id="method2-yes"
                          className="radio-right-gap"
                          name="any-method2"
                          type="radio"
                        />
                        <label htmlFor="method2-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          value={"No"}
                          checked={screening2Years === "No"}
                          style={{ marginLeft: 20 }}
                          onChange={(e) => setScreening2Years(e.target.value)}
                          id="method2-no"
                          className="radio-right-gap"
                          name="any-method2"
                          type="radio"
                        />
                        <label htmlFor="method2-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          value={"Unknown"}
                          checked={screening2Years === "Unknown"}
                          onChange={(e) => setScreening2Years(e.target.value)}
                          id="method2-un"
                          style={{ marginLeft: 20 }}
                          className="radio-right-gap"
                          name="any-method2"
                          type="radio"
                        />
                        <label htmlFor="method2-un">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Any Method of Screening<br/> Found within 1 Year Before HCC diagnosis?
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          id="method1-yes"
                          value={"Yes"}
                          // style={{ marginLeft: 20 }}
                          checked={screening1Year === "Yes"}
                          onChange={(e) => setScreening1Year(e.target.value)}
                          className="radio-right-gap"
                          name="any-method1"
                          type="radio"
                        />
                        <label htmlFor="method1-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="method1-no"
                          value={"No"}
                          style={{ marginLeft: 20 }}
                          checked={screening1Year === "No"}
                          onChange={(e) => setScreening1Year(e.target.value)}
                          className="radio-right-gap"
                          name="any-method1"
                          type="radio"
                        />
                        <label htmlFor="method1-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="method1-un"
                          value={"Unknown"}
                          style={{ marginLeft: 20 }}
                          checked={screening1Year === "Unknown"}
                          onChange={(e) => setScreening1Year(e.target.value)}
                          className="radio-right-gap"
                          name="any-method1"
                          type="radio"
                        />
                        <label htmlFor="method1-un">Unknown</label>
                      </div>
                    </div>
                    {/* ========= */}
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Method Of Screening ?</label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required
                            id="method-screening-ct"
                            name="method-screening"
                            checked={
                              methodOfScreening === "CT (Computed Tomography)"
                            }
                            value={"CT (Computed Tomography)"}
                            onChange={(e) => {
                              if (methodOfScreening === "Other") {
                                setMethodOfScreeningTxt("");
                              } else {
                                setMethodOfScreeningTxt("");
                              }
                              setMethodOfScreening(e.target.value);
                            }}
                            type="radio"
                          />
                          <label htmlFor="method-screening-ct" className="mL5">
                            CT (Computed Tomography)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="method-screening-mri"
                            name="method-screening"
                            checked={
                              methodOfScreening ===
                              "MRI (Magnetic Resonance Imaging)"
                            }
                            value={"MRI (Magnetic Resonance Imaging)"}
                            onChange={(e) => {
                              if (methodOfScreening === "Other") {
                                setMethodOfScreeningTxt("");
                              } else {
                                setMethodOfScreeningTxt("");
                              }
                              setMethodOfScreening(e.target.value);
                            }}
                            type="radio"
                          />
                          <label htmlFor="method-screening-mri" className="mL5">
                            MRI (Magnetic Resonance Imaging)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="method-screening-us"
                            name="method-screening"
                            checked={methodOfScreening === "US (Ultra-Sound)"}
                            value={"US (Ultra-Sound)"}
                            onChange={(e) => {
                              if (methodOfScreening === "Other") {
                                setMethodOfScreeningTxt("");
                              } else {
                                setMethodOfScreeningTxt("");
                              }
                              setMethodOfScreening(e.target.value);
                            }}
                            type="radio"
                          />
                          <label htmlFor="screen-question-us" className="mL5">
                            US (Ultra-Sound)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="method-screening-AFP"
                            name="method-screening"
                            checked={
                              methodOfScreening === "AFP (Alpha-fetoprotein)"
                            }
                            value={"AFP (Alpha-fetoprotein)"}
                            onChange={(e) => {
                              if (methodOfScreening === "Other") {
                                setMethodOfScreeningTxt("");
                              } else {
                                setMethodOfScreeningTxt("");
                              }
                              setMethodOfScreening(e.target.value);
                            }}
                            type="radio"
                          />
                          <label htmlFor="method-screening-AFP" className="mL5">
                            AFP (Alpha-fetoprotein)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="method-screening-un"
                            name="method-screening"
                            checked={methodOfScreening === "Unknown"}
                            value={"Unknown"}
                            onChange={(e) => {
                              if (methodOfScreening === "Other") {
                                setMethodOfScreeningTxt("");
                              } else {
                                setMethodOfScreeningTxt("");
                              }
                              setMethodOfScreening(e.target.value);
                            }}
                            type="radio"
                          />
                          <label htmlFor="method-screening-un" className="mL5">Unknown</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="method-screening-other"
                            name="method-screening"
                            checked={methodOfScreening === "Other"}
                            value={"Other"}
                            onChange={(e) => setMethodOfScreening(e.target.value)}
                            type="radio"
                          />
                          <label htmlFor="method-screening-other" className="mL5">Other, If Others, Pls Specify</label>
                          <textarea
                            onKeyDown={handleKeyPress}
                            required={methodOfScreening === "Other"}
                            disabled={methodOfScreening !== "Other"}
                            value={methodOfScreeningTxt}
                            maxLength={50}
                            onChange={(e) =>
                              setMethodOfScreeningTxt(e.target.value)
                            }
                            rows={1}
                            className="form-control"
                            type="text"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
          {/*================================== HIV-Specific Lab Data ====================================*/}
          <div>
            <div className="study-container">
              <div className="studyData-container">
                <h1 className="study-txt">
                  HIV-Specific Lab Data within 6 months of HCC diagnosis
                </h1>
                <button
                  type="button"
                  onClick={hivButtonHandle}
                  className="study-btn"
                >
                  {hivSpecificButton ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </button>
              </div>

              <div className={hivSpecificButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" htmlFor="study-title" style={{ fontWeight: 600 }}>
                          History of HIV
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          checked={historyHIV === "Yes"}
                          disabled={hivComorbidities !== "Yes"}
                          onChange={(e) => setHistoryHiv(e.target.value)}
                          value={"Yes"}
                          name="history-of-hiv"
                          id="history-yes"
                          type="radio"
                        />
                        <label htmlFor="history-yes" className="mL5">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={hivComorbidities !== "Yes"}
                          checked={historyHIV === "No"}
                          style={{ marginLeft: 20 }}
                          onChange={(e) => {
                            const s = e.target.value;
                            if (s === "Yes") {
                              setYearOfHIVHCC("");
                              setDateOfHIVDurationFrom("");
                            } else {
                              setYearOfHIVHCC("");
                              setDateOfHIVDurationFrom("");
                            }
                            setHistoryHiv(s);
                          }}
                          value={"No"}
                          name="history-of-hiv"
                          id="history-no"
                          type="radio"
                        />
                        <label htmlFor="history-no" className="mL5">No</label>&nbsp;(If yes, complete the below details)
                      </div>
                    </div>
                    <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" htmlFor="study-title" style={{ fontWeight: 600 }}>
                          Year of HIV Diagnosis
                        </label>
                      </div>
                      <div className="col-sm-2">
                        <input
                          onKeyDown={handleKeyPress}
                          value={yearOfHIVHCC}
                          disabled={historyHIV !== "Yes"}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setYearOfHIVHCC(e.target.value);
                            }
                          }}
                          className="form-control"
                          type="text"
                          placeholder="YYYY"
                        />
                      </div>
                    </div>
                    <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" htmlFor="study-title" style={{ fontWeight: 600 }}>
                          Duration of HIV(years)
                        </label>
                      </div>
                      {/* <div className="container-widthd-comorbidities"> */}
                      <div className="col-sm-8 inlineFlex">
                        <input
                          onKeyDown={handleKeyPress}
                          value={dateOfHIVDurationFrom}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,3}$/.test(inputValue)) {
                              setDateOfHIVDurationFrom(e.target.value);
                            }
                          }}
                          disabled={historyHIV !== "Yes"}
                          className="form-control"
                          type="text"
                          style={{height: 'fit-content', width: 130}}
                        />
                        <label style={{ color: 'black',marginLeft:"7px" }}>
                          (From year of diagnosis of HIV to year of diagnosis of HCC)
                        </label>
                      </div>
                      {/* </div> */}
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label htmlFor="hiv-rna-level" className="label-txt" style={{ fontWeight: 600 }}>
                          HIV RNA Level (most recent)
                        </label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        id="hiv-rna-level"
                        value={hivRNAHCC}
                        disabled={hivComorbidities !== "Yes"}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,10}$/.test(inputValue)) {
                            setHIVRNAHCC(e.target.value);
                          }
                        }}
                        className="form-control"
                        type="text"
                        style={{ width: 150 }}
                      />
                      <label className="mL5">copies/mL</label>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                        If HIV RNA level is below <br/> limit of detection, (Fill the following)
                        </label>
                      </div>
                      <div className="col-sm-8" style={{ display: 'inline-flex' }}>
                        <input
                          onKeyDown={handleKeyPress}
                          // disabled={historyHIV !== "Yes"}
                          disabled={hivComorbidities !== "Yes"}
                          value={"Below Lower Limit of Detection"}
                          checked={belowRadioHCC.includes("Below Lower Limit of Detection")}
                          onChange={(e) => {
                            // setBelowRadioHCC(e.target.value);
                            let updatedValues;
                            if (belowRadioHCC.includes(e.target.value)) {
                              updatedValues = belowRadioHCC.filter((item) => item !== e.target.value);
                              setHIVCD4("");
                              setHIVCD4Nav("");
                              setHivAbsoluteCD4("");
                              setHivAbsoluteCD4Nav("");
                              setHIVCD4CellCount("");
                              setHIVCD4CellCountNav("");
                              setHivInitialHIV1("");
                              setHivInitialHIV1Nav("");
                              setMaximumHIVRNA("");
                              setMaximumHIVRNANav("");
                              setBelowLimitDefect("");
                            } else {
                              updatedValues = [...belowRadioHCC, e.target.value];
                            }
                            setBelowRadioHCC(updatedValues);
                          }}
                          className="chronicliver-ww"
                          type="checkbox"
                          // style={{marginTop: 23}}
                        />
                        <label className="col-sm-6" style={{ marginLeft: 20, marginTop: 17 }}>Below Lower Limit of Detection</label>
                        <input
                          onKeyDown={handleKeyPress}
                          value={belowLimitDefect}
                          // disabled={historyHIV !== "Yes"}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection")
                          }
                          onChange={(e) => setBelowLimitDefect(e.target.value)}
                          id="cd4-hiv"
                          // min={1000}
                          // max={9999}
                          type="text"
                          className="form-control hiv"
                          style={{ height: 35 }}
                        />
                      </div>
                    </div>
                    <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label htmlFor="cd4-hiv" className="label-txt" style={{ fontWeight: 600 }}>
                          CD4 (%) (Clusters of differentiation 4)
                        </label>
                      </div>
                      <div className="container-width">
                        <input
                          onKeyDown={handleKeyPress}
                          required={historyHIV === "Yes"}
                          value={hivCD4}
                          // disabled={historyHIV !== "Yes"}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            hivCD4Nav === "NAV"
                          }
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setHIVCD4(e.target.value);
                            }
                          }}
                          id="cd4-hiv"
                          // min={1000}
                          // max={9999}
                          type="number"
                          className="form-control"
                        />
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <input
                          onKeyDown={handleKeyPress}
                          value={"NAV"}
                          checked={hivCD4Nav === "NAV"}
                          onChange={(e) => {
                            if (hivCD4Nav === "NAV") {
                              setHIVCD4("");
                            } else {
                              setHIVCD4("");
                            }
                            setHIVCD4Nav(e.target.value);
                          }}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection")
                          }
                          type="radio"
                          id="nav-1"
                        />
                        <label className="mL5">NAV</label>
                      </div>
                    </div>
                    <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label htmlFor="absolute-hiv" className="label-txt" style={{ fontWeight: 600 }}>
                          Absolute CD4 (cells/uL)
                        </label>
                      </div>
                      <div className="container-width">
                        <input
                          onKeyDown={handleKeyPress}
                          required={historyHIV === "Yes"}
                          id="absolute-hiv"
                          // disabled={historyHIV !== "Yes"}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            hivAbsoluteCD4Nav === "NAV"
                          }
                          value={hivAbsoluteCD4}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setHivAbsoluteCD4(e.target.value);
                            }
                          }}
                          // min={1000}
                          // max={9999}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection")
                          }
                          value={"NAV"}
                          checked={hivAbsoluteCD4Nav === "NAV"}
                          onChange={(e) => {
                            if (hivAbsoluteCD4Nav === "NAV") {
                              setHivAbsoluteCD4("");
                            } else {
                              setHivAbsoluteCD4("");
                            }
                            setHivAbsoluteCD4Nav(e.target.value);
                          }}
                          type="radio"
                          id="nav-2"
                        />
                        <label htmlFor="nav-2" className="mL5">NAV</label>
                      </div>
                    </div>
                    <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label htmlFor="cd4-cellhiv" className="label-txt" style={{ fontWeight: 600 }}>
                          CD4 Cell Count Nadir (if known)
                        </label>
                      </div>
                      <div className="container-width">
                        <input
                          onKeyDown={handleKeyPress}
                          required={historyHIV === "Yes"}
                          value={hivCD4CellCount}
                          // disabled={historyHIV !== "Yes"}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            hivCD4CellCountNav === "NAV"
                          }
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setHIVCD4CellCount(e.target.value);
                            }
                          }}
                          id="cd4-cellhiv"
                          type="text"
                          // min={1000}
                          // max={9999}
                          className="form-control"
                        />
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection")
                          }
                          value={"NAV"}
                          checked={hivCD4CellCountNav === "NAV"}
                          onChange={(e) => {
                            if (hivCD4CellCountNav === "NAV") {
                              setHIVCD4CellCount("");
                            } else {
                              setHIVCD4CellCount("");
                            }
                            setHIVCD4CellCountNav(e.target.value);
                          }}
                          type="radio"
                          id="nav-3"
                        />
                        <label htmlFor="nav-3" className="mL5">NAV</label>
                      </div>
                    </div>
                    <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label htmlFor="cd4-cellhiv" className="label-txt" style={{ fontWeight: 600 }}>
                          Initial HIV-1 RNA Level (if known)
                        </label>
                      </div>
                      <div className="container-width">
                        <input
                          onKeyDown={handleKeyPress}
                          required={historyHIV === "Yes"}
                          id="initial-hiv"
                          // disabled={historyHIV !== "Yes"}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            hivInitialHIV1Nav === "NAV"
                          }
                          value={hivInitialHIV1}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,10}$/.test(inputValue)) {
                              setHivInitialHIV1(e.target.value);
                            }
                          }}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection")
                          }
                          value={"NAV"}
                          checked={hivInitialHIV1Nav === "NAV"}
                          onChange={(e) => {
                            if (hivInitialHIV1Nav === "NAV") {
                              setHivInitialHIV1("");
                            } else {
                              setHivInitialHIV1("");
                            }
                            setHivInitialHIV1Nav(e.target.value);
                          }}
                          type="radio"
                          id="nav-4"
                        />
                        <label htmlFor="nav-4" className="mL5">NAV</label>
                      </div>
                    </div>
                    <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label htmlFor="cd4-cellhiv" className="label-txt" style={{ fontWeight: 600 }}>
                          Maximum HIV-1 RNA Level (if known)
                        </label>
                      </div>
                      <div className="container-width">

                        <input
                          onKeyDown={handleKeyPress}
                          required={historyHIV === "Yes"}
                          value={maximumHIVRNA}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            maximumHIVRNANav === "NAV"
                          }
                          // disabled={historyHIV !== "Yes"}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,10}$/.test(inputValue)) {
                              setMaximumHIVRNA(e.target.value);
                            }
                          }}
                          id="max-hiv"
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection")
                          }
                          value={"NAV"}
                          checked={maximumHIVRNANav === "NAV"}
                          onChange={(e) => {
                            if (maximumHIVRNANav === "NAV") {
                              setMaximumHIVRNA("");
                            } else {
                              setMaximumHIVRNA("");
                            }
                            setMaximumHIVRNANav(e.target.value);
                          }}
                          type="radio"
                          id="nav-5"
                        />
                        <label htmlFor="nav-5" className="mL5">NAV</label>
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
          {/*======================= Hepatitis C virus (HCV) data within 6 ==============================*/}
          <div>
            <div className="study-container">
              <div className="studyData-container">
                <h1 className="study-txt">
                  Hepatitis C virus (HCV) data within 6 months of HCC diagnosis
                </h1>
                <button
                  type="button"
                  onClick={hepatitisCVirusButtonHandle}
                  className="study-btn"
                >
                  {hepatitisCVirusButton ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </button>
              </div>
              <div className={hepatitisCVirusButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is Date of HCV Diagnosis Known?</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          id="is-date-hcv-yes"
                          checked={isDateHCVDiagnosis === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setIsDateHCVDiagnosis(e.target.value)}
                          name="Is date of HCV diagnosis known"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="is-date-hcv-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="is-date-hcv-no"
                          style={{ marginLeft: 20 }}
                          checked={isDateHCVDiagnosis === "No"}
                          value={"No"}
                          onChange={(e) => {
                            if (isDateHCVDiagnosis === "Yes") {
                              setDateOfHCVCVirus("");
                            } else {
                              setDateOfHCVCVirus("");
                            }
                            setIsDateHCVDiagnosis(e.target.value);
                          }}
                          name="Is date of HCV diagnosis known"
                          type="radio"
                          className="chronicliver-ww margin-right-radio"
                        />
                        <label htmlFor="is-date-hcv-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="is-date-hcv-unknown"
                          style={{ marginLeft: 20 }}
                          checked={isDateHCVDiagnosis === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => {
                            if (isDateHCVDiagnosis === "Yes") {
                              setDateOfHCVCVirus("");
                            } else {
                              setDateOfHCVCVirus("");
                            }
                            setIsDateHCVDiagnosis(e.target.value);
                          }}
                          name="Is date of HCV diagnosis known"
                          type="radio"
                          className="chronicliver-ww margin-right-radio"
                        />
                        <label htmlFor="is-date-hcv-unknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Date of HCV Diagnosis</label>
                      </div>
                      <div className="col-sm-3">
                        <input
                          onKeyDown={handleKeyPress}
                          required={isDateHCVDiagnosis === "Yes"}
                          disabled={isDateHCVDiagnosis !== "Yes"}
                          type="date"
                          value={dateOfHCVCVirus}
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            setDateOfHCVCVirus(formattedDate);
                          }}
                          className="form-control"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={dateOfHCVCVirus}
                          disabled={isDateHCVDiagnosis !== "Yes"}
                          onChange={date => setDateOfHCVCVirus(date)}
                          startDate={dateOfHCVCVirus}
                          dateFormat={'dd/MMM/yyyy'}
                          className="form-control date"
                          placeholderText="DD/MMM/YYYY"
                        /> */}
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is HCV Viral Load Known</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          className="margin-right-radio"
                          id="hcv-load-yes"
                          checked={isHCViralCVirus === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setIsHCViralCVirus(e.target.value)}
                          name="Is HCV viral load known"
                          type="radio"
                        />
                        <label htmlFor="hcv-load-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcv-load-no"
                          className="margin-right-radio"
                          style={{ marginLeft: 20 }}
                          checked={isHCViralCVirus === "No"}
                          value={"No"}
                          onChange={(e) => {
                            if (isHCViralCVirus === "Yes") {
                              setHCVviralTimeOfHCCDiagnosis("");
                            } else {
                              setHCVviralTimeOfHCCDiagnosis("");
                            }
                            setIsHCViralCVirus(e.target.value);
                          }}
                          name="Is HCV viral load known"
                          type="radio"
                        />
                        <label htmlFor="hcv-load-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="hcv-load-unknown"
                          className="margin-right-radio"
                          style={{ marginLeft: 20 }}
                          checked={isHCViralCVirus === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => {
                            if (isHCViralCVirus === "Yes") {
                              setHCVviralTimeOfHCCDiagnosis("");
                            } else {
                              setHCVviralTimeOfHCCDiagnosis("");
                            }
                            setIsHCViralCVirus(e.target.value);
                          }}
                          name="Is HCV viral load known"
                          type="radio"
                        />
                        <label htmlFor="hcv-load-unknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>HCV Viral Load at Time of HCC Diagnosis</label>
                      </div>
                      <div className="col-sm-3" style={{ display: 'inline-flex' }}>
                        <input
                          onKeyDown={handleKeyPress}
                          required={isHCViralCVirus === "Yes"}
                          disabled={isHCViralCVirus !== "Yes"}
                          value={HCVviralTimeOfHCCDiagnosis}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,10}$/.test(inputValue)) {
                              setHCVviralTimeOfHCCDiagnosis(e.target.value);
                            }
                          }}
                          type="text"
                          className="form-control"
                          style={{ height: 35 }}
                        />
                        <label className="mL5">IU/mL</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>HCV Genotype</label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!hcvGenotype.length}
                            id="hcvgenotype1a"
                            checked={hcvGenotype.includes("1a")}
                            // value={"1a"}
                            onChange={() => handleHCVGenotypeMultiselection("1a")}
                            name="HCV genotype"
                            type="checkbox"
                          />
                          <label htmlFor="hcvgenotype1a" style={{marginLeft: 5}}>1a</label>
                          {/* </div> */}
                          {/* <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcvgenotype1b"
                            required={!hcvGenotype.length}
                            style={{ marginLeft: 20 }}
                            checked={hcvGenotype.includes("1b")}
                            // value={"1b"}
                            onChange={() => handleHCVGenotypeMultiselection("1b")}
                            name="HCV genotype"
                            type="checkbox"
                          />
                          <label htmlFor="hcvgenotype1b" style={{marginLeft: 5}}>1b</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            id="1 unknown"
                            required={!hcvGenotype.length}
                            style={{ marginLeft: 20 }}
                            checked={hcvGenotype.includes("1 unknown")}
                            // value={"1 unknown"}
                            onChange={() =>
                              handleHCVGenotypeMultiselection("1 unknown")
                            }
                            name="HCV genotype"
                            type="checkbox"
                          />
                          <label htmlFor="1 unknown" style={{marginLeft: 5}}>1 Unknown</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcvgenotype2"
                            required={!hcvGenotype.length}
                            style={{ marginLeft: 20 }}
                            checked={hcvGenotype.includes("2")}
                            // value={"2"}
                            onChange={() => handleHCVGenotypeMultiselection("2")}
                            name="HCV genotype"
                            type="checkbox"
                          />
                          <label htmlFor="hcvgenotype2" style={{marginLeft: 5}}>2</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcvgenotype3"
                            required={!hcvGenotype.length}
                            style={{ marginLeft: 20 }}
                            checked={hcvGenotype.includes("3")}
                            // value={"3"}
                            onChange={() => handleHCVGenotypeMultiselection("3")}
                            name="HCV genotype"
                            type="checkbox"
                          />
                          <label htmlFor="hcvgenotype3" style={{marginLeft: 5}}>3</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcvgenotype4"
                            required={!hcvGenotype.length}
                            style={{ marginLeft: 20 }}
                            checked={hcvGenotype.includes("4")}
                            // value={"4"}
                            onChange={() => handleHCVGenotypeMultiselection("4")}
                            name="HCV genotype"
                            type="checkbox"
                          />
                          <label htmlFor="hcvgenotype4" style={{marginLeft: 5}}>4</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcvgenotype5"
                            required={!hcvGenotype.length}
                            style={{ marginLeft: 20 }}
                            checked={hcvGenotype.includes("5")}
                            // value={"5"}
                            onChange={() => handleHCVGenotypeMultiselection("5")}
                            name="HCV genotype"
                            type="checkbox"
                          />
                          <label htmlFor="hcvgenotype5" style={{marginLeft: 5}}>5</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcvgenotype6"
                            required={!hcvGenotype.length}
                            style={{ marginLeft: 20 }}
                            checked={hcvGenotype.includes("6")}
                            // value={"6"}
                            onChange={() => handleHCVGenotypeMultiselection("6")}
                            name="HCV genotype"
                            type="checkbox"
                          />
                          <label htmlFor="hcvgenotype6" style={{marginLeft: 5}}>6</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcvgenotypeunknown"
                            required={!hcvGenotype.length}
                            style={{ marginLeft: 20 }}
                            checked={hcvGenotype.includes("Unknown")}
                            // value={"Unknown"}
                            onChange={() =>
                              handleHCVGenotypeMultiselection("Unknown")
                            }
                            name="HCV genotype"
                            type="checkbox"
                          />
                          <label htmlFor="hcvgenotypeunknown" style={{marginLeft: 5}}>Unknown</label>
                        </div>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Was HCV Treatment Received Before or After initial HCC diagnosis?</label>
                      </div>
                      <div className="col-sm-8">
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="margin-right-radio"
                            required
                            id="Beforewas"
                            checked={wasHCVReceivedBeforeAfter === "Before"}
                            value={"Before"}
                            onChange={(e) =>
                              setWasHCVReceivedBeforeAfter(e.target.value)
                            }
                            name="Was HCV treatment received before or after"
                            type="radio"
                          />
                          <label htmlFor="Beforewas">Before</label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="margin-right-radio"
                            id="Afterwas"
                            checked={wasHCVReceivedBeforeAfter === "After"}
                            value={"After"}
                            onChange={(e) =>
                              setWasHCVReceivedBeforeAfter(e.target.value)
                            }
                            name="Was HCV treatment received before or after"
                            type="radio"
                          />
                          <label htmlFor="Afterwas">After</label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="margin-right-radio"
                            id="Not applicablewas"
                            checked={wasHCVReceivedBeforeAfter === "Not applicable"}
                            value={"Not applicable"}
                            onChange={(e) =>
                              setWasHCVReceivedBeforeAfter(e.target.value)
                            }
                            name="Was HCV treatment received before or after"
                            type="radio"
                          />
                          <label htmlFor="Not applicablewas">Not Applicable</label>
                        </div>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>HCV Treatment Type</label>
                      </div>
                      <div className="chronic-mittal">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!hcvTreatmentCVirus.length}
                            id="hcv-treatmentDaa"
                            checked={hcvTreatmentCVirus.includes(
                              "DAA (direct acting antiviral)"
                            )}
                            // value={"DAA (direct acting antiviral)"}
                            onChange={() =>
                              handleHCVTreatmentCVirus(
                                "DAA (direct acting antiviral)"
                              )
                            }
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-treatmentDaa" className="mL5">
                            DAA (direct-acting antiviral)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcv-protease"
                            required={!hcvTreatmentCVirus.length}
                            checked={hcvTreatmentCVirus.includes(
                              "Protease inhibitor"
                            )}
                            // value={"Protease inhibitor"}
                            onChange={() =>
                              handleHCVTreatmentCVirus("Protease inhibitor")
                            }
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-protease" className="mL5">Protease Inhibitor</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcv-peg"
                            required={!hcvTreatmentCVirus.length}
                            checked={hcvTreatmentCVirus.includes("Peg interferon")}
                            // value={"Peg interferon"}
                            onChange={() =>
                              handleHCVTreatmentCVirus("Peg interferon")
                            }
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-peg" className="mL5">Peg Interferon</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcv-ribavirin"
                            required={!hcvTreatmentCVirus.length}
                            checked={hcvTreatmentCVirus.includes("Ribavirin")}
                            // value={"Ribavirin"}
                            onChange={() => handleHCVTreatmentCVirus("Ribavirin")}
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-ribavirin" className="mL5">Ribavirin</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcv-interferon"
                            required={!hcvTreatmentCVirus.length}
                            checked={hcvTreatmentCVirus.includes("Interferon alpha")}
                            // value={"Interferon alpha"}
                            onChange={() =>
                              handleHCVTreatmentCVirus("Interferon alpha")
                            }
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-interferon" className="mL5">Interferon Alpha</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcv-unknown"
                            required={!hcvTreatmentCVirus.length}
                            checked={hcvTreatmentCVirus.includes("Unknown")}
                            // value={"Unknown"}
                            onChange={() => handleHCVTreatmentCVirus("Unknown")}
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-unknown" className="mL5">Unknown</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            id="hcv-notreatment"
                            required={!hcvTreatmentCVirus.length}
                            checked={hcvTreatmentCVirus.includes(
                              "No treatment received"
                            )}
                            // value={"No treatment received"}
                            onChange={() =>
                              handleHCVTreatmentCVirus("No treatment received")
                            }
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-notreatment" className="mL5">
                            No Treatment Received
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>When was HCV Treated (year)</label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        // min={1900}
                        // max={2024}
                        placeholder="YYYY"
                        value={hcvTreatedYear}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,4}$/.test(inputValue)) {
                            setHCVTreatedYear(e.target.value);
                          }
                        }}
                        className="form-control"
                        type="text"
                        style={{ width: 100 }}
                      />
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is HCV Viral Load after Treatment Known?</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          id="treament-hcv-yes"
                          checked={hcvViralLoadAfterTreatment === "Yes"}
                          value={"Yes"}
                          onChange={(e) =>
                            setHcvViralLoadAfterTreatment(e.target.value)
                          }
                          name="Is HCV viral load after treatment known?"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="treatment-hcv-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="treatment-hcv-no"
                          checked={hcvViralLoadAfterTreatment === "No"}
                          value={"No"}
                          onChange={(e) => {
                            if (hcvViralLoadAfterTreatment === "Yes") {
                              setHcvPostTreatment("");
                            } else {
                              setHcvPostTreatment("");
                            }
                            setHcvViralLoadAfterTreatment(e.target.value);
                          }}
                          name="Is HCV viral load after treatment known?"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="treatment-hcv-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="treatment-hcv-unknown"
                          checked={hcvViralLoadAfterTreatment === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => {
                            if (hcvViralLoadAfterTreatment === "Yes") {
                              setHcvPostTreatment("");
                            } else {
                              setHcvPostTreatment("");
                            }
                            setHcvViralLoadAfterTreatment(e.target.value);
                          }}
                          name="Is HCV viral load after treatment known?"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="treatment-hcv-unknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>HCV Viral Load Post Treatment</label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        required={hcvViralLoadAfterTreatment === "Yes"}
                        disabled={hcvViralLoadAfterTreatment !== "Yes"}
                        className="form-control"
                        type="text"
                        value={hcvPostTreatment}
                        style={{ width: 100 }}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,10}$/.test(inputValue)) {
                            setHcvPostTreatment(e.target.value);
                          }
                        }}
                      />
                      <label className="mL5">IU/mL</label>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Sustained virological response (SVR) after HCV treatment (undetectable HCV RNA 12 weeks after completion of treatment)</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          id="sustained-yes"
                          checked={sustainedHCV === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setSustainedHcv(e.target.value)}
                          name="Sustained virological response (SVR) after"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="sustained-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          // className="margin-right-radio"
                          id="sustained-no"
                          checked={sustainedHCV === "No"}
                          value={"No"}
                          onChange={(e) => setSustainedHcv(e.target.value)}
                          name="Sustained virological response (SVR) after"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="sustained-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          // className="margin-right-radio"
                          id="sustained-unknown"
                          checked={sustainedHCV === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => setSustainedHcv(e.target.value)}
                          name="Sustained virological response (SVR) after"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="sustained-unknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Year SVR Achieved</label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        // min={1900}
                        // max={2024}
                        id="year-svr-hcc"
                        value={yearSVRHCV}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,4}$/.test(inputValue)) {
                            setYearSVRHCV(e.target.value);
                          }
                        }}
                        placeholder="YYYY"
                        className="form-control"
                        type="text"
                        style={{ width: 100 }}
                      />
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          </div >
          {/*=========================== Hepatitis B virus (HBV) ===========================*/}
          < div >
            <div className="study-container">
              <div className="studyData-container">
                <h1 className="study-txt">
                  Hepatitis B virus (HBV) data within 6 months of HCC diagnosis
                </h1>
                <button
                  type="button"
                  onClick={hepatitisBVirusButtonHandle}
                  className="study-btn"
                >
                  {hepatitisBVirusButton ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </button>
              </div>
              <div className={hepatitisBVirusButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is Date of HBV diagnosis Known?</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          id="is-Date-BVirusYes"
                          value={"Yes"}
                          onChange={(e) => setIsDateHBVDiagnosis(e.target.value)}
                          checked={isDateHBVDiagnosis === "Yes"}
                          name="Is date of HBV diagnosis known?"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="is-Date-BVirusYes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="is-Date-BVirusNo"
                          style={{ marginLeft: 20 }}
                          value={"No"}
                          onChange={(e) => {
                            if (isDateHBVDiagnosis === "Yes") {
                              setDateOfHBVBVirus("");
                            } else {
                              setDateOfHBVBVirus("");
                            }
                            setIsDateHBVDiagnosis(e.target.value);
                          }}
                          checked={isDateHBVDiagnosis === "No"}
                          name="Is date of HBV diagnosis known?"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="is-Date-BVirusNo">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="is-Date-BVirusUnknown"
                          style={{ marginLeft: 20 }}
                          value={"Unknown"}
                          checked={isDateHBVDiagnosis === "Unknown"}
                          onChange={(e) => {
                            if (isDateHBVDiagnosis === "Yes") {
                              setDateOfHBVBVirus("");
                            } else {
                              setDateOfHBVBVirus("");
                            }
                            setIsDateHBVDiagnosis(e.target.value);
                          }}
                          name="Is date of HBV diagnosis known?"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="is-Date-BVirusUnknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Date of HBV Diagnosis</label>
                      </div>
                      <div className="col-sm-3">
                        <input
                          onKeyDown={handleKeyPress}
                          required={isDateHBVDiagnosis === "Yes"}
                          disabled={isDateHBVDiagnosis !== "Yes"}
                          type="date"
                          value={dateOfHBVBVirus}
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            setDateOfHBVBVirus(formattedDate);
                          }}
                          className="form-control"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={dateOfHBVBVirus}
                          disabled={isDateHBVDiagnosis !== "Yes"}
                          onChange={date => setDateOfHBVBVirus(date)}
                          startDate={dateOfHBVBVirus}
                          dateFormat={'dd/MMM/yyyy'}
                          className="form-control date"
                          placeholderText="DD/MMM/YYYY"
                        /> */}
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is HBV Viral Load Known</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          className="margin-right-radio"
                          checked={isHBViralBVirus === "Yes"}
                          value={"Yes"}
                          onChange={(e) => {
                            setIsHBViralBVirus(e.target.value);
                          }}
                          id="is HBV viral load knownYes"
                          name="Is HBV viral load known"
                          type="radio"
                        />
                        <label htmlFor="is HBV viral load knownYes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          checked={isHBViralBVirus === "No"}
                          className="margin-right-radio"
                          style={{ marginLeft: 20 }}
                          value={"No"}
                          onChange={(e) => {
                            if (isHBViralBVirus === "Yes") {
                              setHBVviralTimeOfHCCDiagnosis("");
                            } else {
                              setHBVviralTimeOfHCCDiagnosis("");
                            }
                            setIsHBViralBVirus(e.target.value);
                          }}
                          id="is HBV viral load knownNo"
                          name="Is HBV viral load known"
                          type="radio"
                        />
                        <label htmlFor="is HBV viral load knownNo">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          className="margin-right-radio"
                          style={{ marginLeft: 20 }}
                          checked={isHBViralBVirus === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => {
                            if (isHBViralBVirus === "Yes") {
                              setHBVviralTimeOfHCCDiagnosis("");
                            } else {
                              setHBVviralTimeOfHCCDiagnosis("");
                            }
                            setIsHBViralBVirus(e.target.value);
                          }}
                          id="is HBV viral load knownUnknown"
                          name="Is HBV viral load known"
                          type="radio"
                        />
                        <label htmlFor="is HBV viral load knownUnknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          HBV Viral Load at Time of HCC Diagnosis
                        </label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        required={isHBViralBVirus === "Yes"}
                        disabled={isHBViralBVirus !== "Yes"}
                        value={HBVviralTimeOfHCCDiagnosis}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,10}$/.test(inputValue)) {
                            setHBVviralTimeOfHCCDiagnosis(e.target.value);
                          }
                        }}
                        type="text"
                        className="form-control"
                        style={{ width: 150, height: 35 }}
                      />
                      <label className="small">IU/ml</label>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Was HBV treatment received before or after initial HCC diagnosis?
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          checked={wasHBVReceivedBeforeAfter === "Before"}
                          value={"Before"}
                          onChange={(e) => setWasHBVReceivedBeforeAfter(e.target.value)}
                          id="Beforewas"
                          name="Was HBV treatment received before or after B"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="Beforewas">Before</label>
                        <input
                          onKeyDown={handleKeyPress}
                          checked={wasHBVReceivedBeforeAfter === "After"}
                          value={"After"}
                          onChange={(e) => setWasHBVReceivedBeforeAfter(e.target.value)}
                          id="afterwas"
                          name="Was HBV treatment received before or after B"
                          className="chronicliver-ww margin-right-radio"
                          style={{ marginLeft: 20 }}
                          type="radio"
                        />
                        <label htmlFor="afterwas">After</label>
                        <input
                          onKeyDown={handleKeyPress}
                          checked={wasHBVReceivedBeforeAfter === "Not applicable"}
                          value={"Not applicable"}
                          onChange={(e) => setWasHBVReceivedBeforeAfter(e.target.value)}
                          id="not-applicablewas"
                          name="Was HBV treatment received before or after B"
                          className="chronicliver-ww margin-right-radio"
                          style={{ marginLeft: 20 }}
                          type="radio"
                        />
                        <label htmlFor="not-applicablewas">Not applicable</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>HBV Treatment Type</label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                          className="screen-m"
                            onKeyDown={handleKeyPress}
                            required={!hcvTreatmentBVirus.length}
                            id="lamivudineHcv"
                            checked={hcvTreatmentBVirus.includes("Lamivudine")}
                            // value={"Lamivudine"}
                            onChange={() => handleHCVTreatmentBVirus("Lamivudine")}
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="lamivudineHcv">Lamivudine</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                          className="screen-m"
                            onKeyDown={handleKeyPress}
                            id="tenofovirHcv"
                            required={!hcvTreatmentBVirus.length}
                            checked={hcvTreatmentBVirus.includes("Tenofovir")}
                            // value={"Tenofovir"}
                            onChange={() => handleHCVTreatmentBVirus("Tenofovir")}
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="tenofovirHcv">Tenofovir</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                          className="screen-m"
                            onKeyDown={handleKeyPress}
                            id="entecavirHcv"
                            required={!hcvTreatmentBVirus.length}
                            checked={hcvTreatmentBVirus.includes("Entecavir")}
                            // value={"Entecavir"}
                            onChange={() => handleHCVTreatmentBVirus("Entecavir")}
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="entecavirHcv">Entecavir</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                          className="screen-m"
                            onKeyDown={handleKeyPress}
                            id="enterferonHcv"
                            required={!hcvTreatmentBVirus.length}
                            checked={hcvTreatmentBVirus.includes("Interferon alpha")}
                            // value={"Interferon alpha"}
                            onChange={() =>
                              handleHCVTreatmentBVirus("Interferon alpha")
                            }
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="enterferonHcv">Interferon Alpha</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                          className="screen-m"
                            onKeyDown={handleKeyPress}
                            id="unknownHcv"
                            required={!hcvTreatmentBVirus.length}
                            checked={hcvTreatmentBVirus.includes("Unknown")}
                            // value={"Unknown"}
                            onChange={() => handleHCVTreatmentBVirus("Unknown")}
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="unknownHcv">Unknown</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                          className="screen-m"
                            onKeyDown={handleKeyPress}
                            id="no-treatmentHcv"
                            required={!hcvTreatmentBVirus.length}
                            checked={hcvTreatmentBVirus.includes(
                              "No treatment received"
                            )}
                            // value={"No treatment received"}
                            onChange={() =>
                              handleHCVTreatmentBVirus("No treatment received")
                            }
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="no-treatmentHcv">
                            No Treatment Received
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>When was HBV Treated (year)</label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        type="text"
                        value={dateOfHBVTreatmentYear}
                        // min={1900}
                        // max={2024}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,4}$/.test(inputValue)) {
                            setDateOfHBVTreatmentYear(e.target.value);
                          }
                        }}
                        placeholder="YYYY"
                        className="form-control"
                        style={{ width: 100 }}
                      />
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Is HBV Viral Load after Treatment Known?
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          id="yes-hbv-after"
                          checked={hbvViralLoadAfterTreatment === "Yes"}
                          value={"Yes"}
                          onChange={(e) =>
                            setHbvViralLoadAfterTreatment(e.target.value)
                          }
                          name="Is HBV viral load after treatment known? B"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="yes-hbv-after">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="no-hbv-after"
                          style={{ marginLeft: 20 }}
                          checked={hbvViralLoadAfterTreatment === "No"}
                          value={"No"}
                          onChange={(e) => {
                            if (hbvViralLoadAfterTreatment === "Yes") {
                              setHbvPostTreatment("");
                            } else {
                              setHbvPostTreatment("");
                            }
                            setHbvViralLoadAfterTreatment(e.target.value);
                          }}
                          name="Is HBV viral load after treatment known? B"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="no-hbv-after">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          id="unknown-hbv-after"
                          style={{ marginLeft: 20 }}
                          checked={hbvViralLoadAfterTreatment === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => {
                            if (hbvViralLoadAfterTreatment === "Yes") {
                              setHbvPostTreatment("");
                            } else {
                              setHbvPostTreatment("");
                            }
                            setHbvViralLoadAfterTreatment(e.target.value);
                          }}
                          name="Is HBV viral load after treatment known? B"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="unknown-hbv-after">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          HBV Viral Load Post Treatment
                        </label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        required={hbvViralLoadAfterTreatment === "Yes"}
                        disabled={hbvViralLoadAfterTreatment !== "Yes"}
                        id="hbv-post-treatment"
                        value={hbvPostTreatment}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,10}$/.test(inputValue)) {
                            setHbvPostTreatment(e.target.value);
                          }
                        }}
                        className="form-control"
                        type="text"
                        style={{ width: 150 }}
                      />
                      <label className="mL5">IU/mL</label>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          </div >
          {/* Logs Container */}
          <div className="study-container" >
            {/* <div className="studyData-container">
              <h1 className="study-txt">Logs</h1>
              <button type="button" onClick={logUpHandle} className="study-btn">
                {logUp ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </button>
            </div> */}
            {/* <div className={logUp ? "study-data" : ""}>
              <Fade>
                <div className="card p-3">
                  <div className="row">
                    <div className="col-sm-3">
                      <label className="label-txt">Created By</label>
                      <input
onKeyDown={handleKeyPress}
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        type="text"
                        disabled
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-3">
                      <label className="label-txt">Created On</label>
                      <input
onKeyDown={handleKeyPress}
                        value={createdOn}
                        onChange={(e) => {
                          const inputDate = e.target.value;
                          const [year, month, day] = inputDate.split("-");
                          const limitedYear = year.slice(0, 4);
                          const formattedDate = `${limitedYear}-${month}-${day}`;
                          setCreatedOn(formattedDate);
                        }}
                        type="date"
                        disabled
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-3">
                      <label className="label-txt">Changed By</label>
                      <input
onKeyDown={handleKeyPress}
                        value={changedBy}
                        onChange={(e) => setChangedBy(e.target.value)}
                        type="text"
                        disabled
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-3">
                      <label className="label-txt">Changed On</label>
                      <input
onKeyDown={handleKeyPress}
                        value={changedOn}
                        onChange={(e) => {
                          const inputDate = e.target.value;
                          const [year, month, day] = inputDate.split("-");
                          const limitedYear = year.slice(0, 4);
                          const formattedDate = `${limitedYear}-${month}-${day}`;
                          setChangedOn(formattedDate);
                        }}
                        type="date"
                        disabled
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </Fade>
            </div> */}
          </div >
          {/* Logs Container */}
          <div className="d-flex justify-content-end p-4">
            <button className="btn btn-secondary" type="submit">
              Submit to Review
            </button>
          </div>
        </form >
      </div>
    </>
  );
};

export default Home;
