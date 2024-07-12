import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import config from "../../config";

const Values = (props) => {
  const [commentsData, setComments] = useState();
  const { formID } = useParams();
  const [getData, setGetData] = useState([]);
  const [ids, setId] = useState();
  const [onlyData, setOnlyData] = useState({});
  // const [role, setRole] = useState("data entry");
  //study initializers
  const [studyButton, setStudyButton] = useState(false);
  const studyButtonHandle = () => {
    setStudyButton(!studyButton);
  };
  const [studyTitle, setStudyTitle] = useState();
  const [projectNo, setProjectNo] = useState();
  const [siteId, setSiteId] = useState();
  const [studyDate, setStudyDate] = useState("");
  const { apiUrl } = config;

  // const handleStudyDate = (date) => {
  //   setStudyDate(date);
  //   if (date) {
  //     setStudyDate(moment(date).format("DD-MMM-YYYY"));
  //   } else {
  //     setStudyDate(null);
  //   }
  // };

  //subject initializers
  const [subjectButton, setSubjectButton] = useState(true);
  const subjectButtonHandle = () => {
    setSubjectButton(!subjectButton);
  };
  const [subjectId, setSubjectId] = useState();
  const [subjectCounter, setSubjectCounter] = useState();
  const [subjectUnknown, setSubjectUnknown] = useState(false);
  const [subjectGender, setSubjectGender] = useState();
  // const [sexOfPatient, setSexOfPatient] = useState();

  const [subjectYear, setSubjectYear] = useState();
  const [nationality, setNationality] = useState();
  const [nationalityOther, setNationalityOther] = useState();
  const [otherCheck, setOtherCheck] = useState();
  const [subjectOtherText, setSubjectOtherText] = useState();
  const [placeOfBirthCity, setPlaceOfBirthCity] = useState();
  const [placeOfBirthState, setPlaceOfBirthState] = useState();
  const [residencyCity, setResidencyCity] = useState();
  const [residencyState, setResidencyState] = useState();
  const [ethnicity, setEthnicity] = useState();

  //  Baseline Characteristic initializers
  const [baseLineButton, setBaseLineButton] = useState(true);
  const [dateOfHcc, setDateOfHcc] = useState("");
  const [baseLineIfDate, setBaseLineIfDate] = useState();
  const [baseLineIfDateRadio, setBaseLineIfDateRadio] = useState("");
  const [baseLineAgeOfHcc, setBaseLineAgeOfHcc] = useState();
  const [baseLineHeight, setBaseLineHeight] = useState();
  const [weightHggBaseLine, setWeightHggBaseLine] = useState();
  const [bmiBaseLine, setBmiBaseLine] = useState();
  const [insuranceValue, setInsuranceValue] = useState("");
  const [insuraceValueOtherBaseline, setInsuranceValueOtherBaseline] =
    useState("");
  const [insuraceDetailsBaseLine, setInsuranceDetailsBaseLine] = useState();
  const baseLineCharacterButtonHandle = () => {
    setBaseLineButton(!baseLineButton);
  };
  // const handleDateOfHcc = (date) => {
  //   const dateCurrent = moment(date).format("DD-MMM-YYYY");
  //   setDateOfHcc(dateCurrent);
  // };

  // Laboratory Parameters
  const [laboratoryButton, setLaboratoryButton] = useState(true);
  const [alanineValue, setAlanineValue] = useState();
  const [alanineFrom, setAlanineFrom] = useState();
  const [alanineTo, setAlanineTo] = useState();

  const [aspartateValue, setAspartateValue] = useState();
  const [aspartateFrom, setAspartateFrom] = useState();
  const [aspartateTo, setAspartateTo] = useState();

  const [bilirubinValue, setBilirubinValue] = useState();
  const [bilirubinFrom, setBilirubinFrom] = useState();
  const [bilirubinTo, setBilirubinTo] = useState();

  const [alkalineValue, setAlkalineValue] = useState();
  const [alkalineFrom, setAlkalineFrom] = useState();
  const [alkalineTo, setAlkalineTo] = useState();

  const [albuminValue, setAlbuminValue] = useState();
  const [albuminFrom, setAlbuminFrom] = useState();
  const [albuminTo, setAlbuminTo] = useState();

  const [platelatesValue, setPlatelatesValue] = useState();
  const [platelatesFrom, setPlatelatesFrom] = useState();
  const [platelatesTo, setPlatelatesTo] = useState();

  const [creatinineValue, setCreatinineValue] = useState();
  const [creatinineFrom, setCreatinineFrom] = useState();
  const [creatinineTo, setCreatinineTo] = useState();

  const [prothrombinValue, setProthrombinValue] = useState();
  const [prothrombinFrom, setProthrombinFrom] = useState();
  const [prothrombinTo, setProthrombinTo] = useState();

  const [internationalValue, setInternationalValue] = useState();
  const [internationalFrom, setInternationalFrom] = useState();
  const [internationalTo, setinternationalTo] = useState();

  const [alphaValue, setAlphaValue] = useState();
  const [alphaFrom, setAlphaFrom] = useState();
  const [alphaTo, setAlphaTo] = useState();

  const [sodiumValue, setSodiumValue] = useState();
  const [sodiumFrom, setSodiumFrom] = useState();
  const [sodiumTo, setSodiumTo] = useState();

  const [bloodUreaValue, setBloodUreaValue] = useState();
  const [bloodUreaFrom, setBloodUreaFrom] = useState();
  const [bloodUreaTo, setBloodUreaTo] = useState();

  const [cholesterolValue, setCholesterolValue] = useState();
  const [cholesterolFrom, setCholesterolFrom] = useState();
  const [cholesterolTo, setCholesterolTo] = useState();

  const [triglyceridesValue, setTriglyceridesValue] = useState();
  const [triglyceridesFrom, setTriglyceridesFrom] = useState();
  const [triglyceridesTo, setTriglyceridesTo] = useState();

  const [highDensityValue, setHighDensityValue] = useState();
  const [highDenistyFrom, setHighDenistyFrom] = useState();
  const [highDensityTo, setHighDensityTo] = useState();

  const [lowDensityValue, setLowDensityValue] = useState();
  const [lowDensityFrom, setLowDensityFrom] = useState();
  const [lowDensityTo, setLowDensityTo] = useState();

  const [modelEndStageLab, setModelEndStageLab] = useState("");
  const [modelEndStageTextArea, setModelEndStageTextArea] = useState();
  const [meldScoreLab, setMeldScoreLab] = useState();
  const [fib4Lab, setFIB4Lab] = useState();
  const [astPlateletLab, setastPlateletLab] = useState();
  const laboratoryButtonHandle = () => {
    setLaboratoryButton(!laboratoryButton);
  };

  //Comorbidities Parameters initializer
  const [comorbiditiesButton, setComorbiditiesButton] = useState(true);
  const [isChecked, setIsChecked] = useState(onlyData?.section5?.isChecked);
  const [diabetesAfter, setDiabetesAfter] = useState();
  const [hypertensionAfter, setHypertensionAfter] = useState();
  const [dysliAfter, setDyslipidemiaAfter] = useState();
  const [coronaryAfter, setCoronaryAfter] = useState();
  const [peripheralAfter, setPeripheralAfter] = useState();
  const [hivAfter, setHIVAfter] = useState();
  const [yesDiabetesInput, setYesDiabetesInput] = useState();
  const [yesHyperTensionInput, setYesHyperTensionInput] = useState();
  const [yesDyslipidemiaInput, setYesDyslipidemiaInput] = useState();
  const [yesCoronaryInput, setYesCoronaryInput] = useState();
  const [yesPeripheralInput, setYesPeripheralInput] = useState();
  const [yesHivInput, setYesHivInput] = useState();
  const [diabetesComorbidities, setComorbiditiesDiabetes] = useState("");
  const [hypertensionComorbidities, setComorbiditiesHypertension] =
    useState("");
  const [dyslipidemiaComorbidities, setComorbiditiesDyslipidemia] =
    useState("");
  const [coronaryComorbidities, setComorbiditiesCoronary] = useState("");
  const [peripheralComorbidities, setComorbiditiesPeripheral] = useState("");
  const [hivComorbidities, setComorbiditiesHiv] = useState("");
  // const [diabetesYes, setDiabetesYes] = useState(false);
  // const [hypertensionYes, setHypertensionYes] = useState(false);
  // const [dyslipidemiaYes, setDyslipidemiaYes] = useState(false);
  // const [coronaryYes, setCoronaryYes] = useState(false);
  // const [peripheralYes, setPeripheralYes] = useState(false);
  // const [hivYes, setHivYes] = useState(false);

  // // console.log(
  //   "dia",
  //   diabetesComorbidities,
  //   "hyper",
  //   hypertensionComorbidities,
  //   "dysli",
  //   dyslipidemiaComorbidities,
  //   "coronary",
  //   coronaryComorbidities,
  //   "peripheral",
  //   peripheralComorbidities,
  //   "hiv",
  //   hivComorbidities
  // );
  const [yesLocationSiteValue, setYesLocationSiteValue] = useState();
  const [yesStageValue, setYesStageValue] = useState();
  const [yesYearOfDiagnosis, setYesYearOfdiagnosis] = useState();
  const [alcoholConsumptionValue, setAlcoholConsumptionValue] = useState("");
  const [diagnosisInformationValue, setDiagnosisInformationValue] =
    useState("");
  const [hccDiagnosisInfoValueOtherSpecify, sethccDiagnosisInfo] = useState();
  const [largeTurmorValue, setLargeTurmorValue] = useState();
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

  const comorbiditiesButtonHandle = () => {
    setComorbiditiesButton(!comorbiditiesButton);
  };

  //Chronic Liver (CLD) initializer
  const [chronicButton, setChronicButton] = useState(true);
  const [fattyLiverCLD, setFattyLiverCLD] = useState("");
  const [fattyLiverRadioLast, setFattyLiverRadioLast] = useState();
  const [fattyLiverDiagnosticFreeText, setFattyLiverDiagnosticFreeText] =
    useState();
  const [cirrhosisStatusValue, setCirrhosisStatusValue] = useState("");
  const [mittalCriteriaValue, setMittalCriteriaValue] = useState("");
  const [underlyingEtiologyValue, setUnderlyingEtiologyValue] = useState("");
  const [etiologyCirrhosisFreeValue, setEtiologyCirrhosisFreeValue] =
    useState();
  const [complicationCLD, setComplicationCLD] = useState("");
  const [hccOutcomeValue, setHccOutcomeValue] = useState("");
  const [treamentModalitiesHCC, setTreamentModalitiesHCC] = useState("");
  const [resectionPerformed, setResectionPerformed] = useState("");
  const [liverTransplantValue, setLiverTransplantValue] = useState("");
  const [recurrenceValue, setRecurrenceValue] = useState("");
  const [selectedDateOfFirstRecurrence, setSelectedDateOfFirstRecurrence] =
    useState("");
  const [survivalStatusValue, setSurvivalStatusValue] = useState("");
  const [selectedDateOfDeath, setSelectedDateOfDeath] = useState("");
  const [selectedDateOfLastContact, setSelectedDateOfLastContact] =
    useState("");
  const [selectedDateOfRecurrenceFree, setSelectedDateOfRecurrenceFree] =
    useState("");
  const [selectedDateOfOverallSurvival, setSelectedDateOfOverallSurvival] =
    useState("");
  const [screeningQuestion, setScreeningQuestionValue] = useState("");
  const [screeningQuestionNa, setScreeningQuestionNa] = useState();
  const chronicButtonHandle = () => {
    setChronicButton(!chronicButton);
  };
  // const handleDateOfFirstRecurrence = (date) => {
  //   setSelectedDateOfFirstRecurrence(moment(date).format("DD-MMM-YYYY"));
  // };

  // const handleCDateOfDeath = (date) => {
  //   setSelectedDateOfDeath(moment(date).format("DD-MMM-YYYY"));
  // };
  // const handleCDateOfLastContact = (date) => {
  //   setSelectedDateOfLastContact(moment(date).format("DD-MMM-YYYY"));
  // };
  // const handleCDateOfRecurrenceFree = (date) => {
  //   setSelectedDateOfRecurrenceFree(moment(date).format("DD-MMM-YYYY"));
  // };
  // const handleCDateOfOverallSurvival = (date) => {
  //   setSelectedDateOfOverallSurvival(moment(date).format("DD-MMM-YYYY"));
  // };
  //HIV Specific initializer
  const [hivSpecificButton, setHivSpecific] = useState(true);
  const [historyHIV, setHistoryHiv] = useState();
  const [yearOfHIVHCC, setYearOfHIVHCC] = useState();
  const [dateOfHIVDurationFrom, setDateOfHIVDurationFrom] = useState();
  const [dateOfHIVDurationTo, setDateOfHIVDurationTo] = useState();
  const [hivRNAHCC, setHIVRNAHCC] = useState();
  const [hivCD4, setHIVCD4] = useState();
  const [hivAbsoluteCD4, setHivAbsoluteCD4] = useState();
  const [hivCD4CellCount, setHIVCD4CellCount] = useState();
  const [hivInitialHIV1, setHivInitialHIV1] = useState();
  const [maximumHIVRNA, setMaximumHIVRNA] = useState();
  // const handleDateOfHIVDuration = (date) => {
  //   setDateOfHIVDuration(moment(date).format("DD-MMM-YYYY"));
  // };
  const hivButtonHandle = () => {
    setHivSpecific(!hivSpecificButton);
  };
  // // console.log(
  //   historyHIV,
  //   yearOfHIVHCC,
  //   dateOfHIVDuration,
  //   hivRNAHCC,
  //   hivCD4,
  //   hivAbsoluteCD4,
  //   hivCD4CellCount,
  //   hivInitialHIV1,
  //   maximumHIVRNA
  // );

  // hepatitisCVirusButton initializer
  const [hepatitisCVirusButton, setHepatitisCVirusButton] = useState(true);
  const [isDateHCVDiagnosis, setIsDateHCVDiagnosis] = useState("");
  const [dateOfHCVCVirus, setDateOfHCVCVirus] = useState("");
  const [isHCViralCVirus, setIsHCViralCVirus] = useState("");
  const [HCVviralTimeOfHCCDiagnosis, setHCVviralTimeOfHCCDiagnosis] =
    useState();
  const [hcvGenotype, setHCVGenotype] = useState("");
  const [wasHCVReceivedBeforeAfter, setWasHCVReceivedBeforeAfter] =
    useState("");
  const [hcvTreatmentCVirus, setHcvTreatmentCVirus] = useState("");
  const [hcvTreatedYear, setHCVTreatedYear] = useState();
  const [hcvViralLoadAfterTreatment, setHcvViralLoadAfterTreatment] =
    useState("");
  const [hcvPostTreatment, setHcvPostTreatment] = useState();
  const hepatitisCVirusButtonHandle = () => {
    setHepatitisCVirusButton(!hepatitisCVirusButton);
  };
  const [sustainedHCV, setSustainedHcv] = useState("");
  const [yearSVRHCV, setYearSVRHCV] = useState(null);
  const handleYearSVRHCV = (date) => {
    setYearSVRHCV(moment(date).format("DD-MMM-YYYY"));
  };

  // const handleDateOfHCVCVirus = (date) => {
  //   setDateOfHCVCVirus(moment(date).format("DD-MMM-YYYY"));
  // };

  // // console.log(
  //   isDateHCVDiagnosis,
  //   dateOfHCVCVirus,
  //   isHCViralCVirus,
  //   HCVviralTimeOfHCCDiagnosis,
  //   hcvGenotype,
  //   wasHCVReceivedBeforeAfter,
  //   hcvTreatmentCVirus,
  //   hcvTreatedYear,
  //   hcvViralLoadAfterTreatment,
  //   hcvPostTreatment,
  //   sustainedHCV,
  //   yearSVRHCV
  // );
  // hepatitisBVirusButton initializer
  const [hepatitisBVirusButton, sethepatitisBVirusButton] = useState(true);
  const [isDateHBVDiagnosis, setIsDateHBVDiagnosis] = useState("");
  const [dateOfHBVBVirus, setDateOfHBVBVirus] = useState("");
  const [isHBViralBVirus, setIsHBViralBVirus] = useState("");
  const [HBVviralTimeOfHCCDiagnosis, setHBVviralTimeOfHCCDiagnosis] =
    useState();
  const [wasHBVReceivedBeforeAfter, setWasHBVReceivedBeforeAfter] =
    useState("");
  const [hcvTreatmentBVirus, setHcvTreatmentBVirus] = useState("");
  const [hbvViralLoadAfterTreatment, setHbvViralLoadAfterTreatment] =
    useState("");
  const [hbvPostTreatment, setHbvPostTreatment] = useState();
  const [dateOfHBVTreatmentYear, setDateOfHBVTreatmentYear] = useState();
  const hepatitisBVirusButtonHandle = () => {
    sethepatitisBVirusButton(!hepatitisBVirusButton);
  };

  const role = Cookies.get("role");
  useEffect(() => {
    // console.log(formID);
    const token = Cookies.get('tkn');
    if (!token) {
      navigate('/login');
    }
    fetch(
      `${apiUrl}/eCRF-rest-service/findRecord?key=recordid&value=${formID}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // setGetData(data);

        // setId(props.id);
        setOnlyData(data);
        const defaultSubjectGender =
          data.section2.subjectGender === "Male"
            ? "Male"
            : data.section2.subjectGender === "Female"
              ? "Female"
              : "";
        setSubjectGender(defaultSubjectGender);
        const defaultEthnicity =
          data?.section2?.otherCheck === "Hispanic"
            ? "Hispanic"
            : data?.section2?.otherCheck === "Latin"
              ? "Latin"
              : data?.section2?.otherCheck === "Others"
                ? "Others"
                : "";
        setEthnicity(defaultEthnicity);
        const defaultNationality =
          data?.section2?.nationality === "Mexico"
            ? "Mexico"
            : data?.section2?.nationality === "Other"
              ? "Other"
              : "";

        setNationality(defaultNationality);
        const defaultbaseLineIfDateRadio =
          data?.section3?.baseLineIfDateRadio === true ? true : false;
        setBaseLineIfDateRadio(defaultbaseLineIfDateRadio);
        const defaultInsuranceBaseLine =
          data?.section3?.insuranceValue === "Private"
            ? "Private"
            : data?.section3?.insuranceValue === "Public"
              ? "Public"
              : data?.section3.insuranceValue === "Other"
                ? "Other"
                : "";

        setInsuranceValue(defaultInsuranceBaseLine);
        const defaultModelEndStageLab =
          data?.section4.modelEndStageLab === "Applicable"
            ? "Applicable"
            : data?.section4.modelEndStageLab === "Not applicable"
              ? "Not applicable"
              : "";
        setModelEndStageLab(defaultModelEndStageLab);

        const defaultDiabetesComorbidities =
          data?.section5?.diabetesComorbidities === "Yes"
            ? "Yes"
            : data?.section5?.diabetesComorbidities === "No"
              ? "No"
              : data?.section5?.diabetesComorbidities === "Unknown"
                ? "Unknown"
                : "";
        setComorbiditiesDiabetes(defaultDiabetesComorbidities);
        const defaultHypertensionComorbidities =
          data?.section5?.hypertensionComorbidities === "Yes"
            ? "Yes"
            : data?.section5?.hypertensionComorbidities === "No"
              ? "No"
              : data?.section5?.hypertensionComorbidities === "Unknown"
                ? "Unknown"
                : "";
        setComorbiditiesHypertension(defaultHypertensionComorbidities);
        const defaultDyslipidemiaComorbidities =
          data?.section5?.dyslipidemiaComorbidities === "Yes"
            ? "Yes"
            : data?.section5?.dyslipidemiaComorbidities === "No"
              ? "No"
              : data?.section5?.dyslipidemiaComorbidities === "Unknown"
                ? "Unknown"
                : "";
        setComorbiditiesDyslipidemia(defaultDyslipidemiaComorbidities);
        const defaultCoronaryComorbidities =
          data?.section5?.coronaryComorbidities === "Yes"
            ? "Yes"
            : data?.section5?.coronaryComorbidities === "No"
              ? "No"
              : data?.section5?.coronaryComorbidities === "Unknown"
                ? "Unknown"
                : "";
        setComorbiditiesCoronary(defaultCoronaryComorbidities);
        const defaultPeripheralComorbidities =
          data?.section5?.peripheralComorbidities === "Yes"
            ? "Yes"
            : data?.section5?.peripheralComorbidities === "No"
              ? "No"
              : data?.section5?.peripheralComorbidities === "Unknown"
                ? "Unknown"
                : "";
        setComorbiditiesPeripheral(defaultPeripheralComorbidities);
        const defaultHivComorbidities =
          data?.section5?.hivComorbidities === "Yes"
            ? "Yes"
            : data?.section5?.hivComorbidities === "No"
              ? "No"
              : data?.section5?.hivComorbidities === "Unknown"
                ? "Unknown"
                : "";
        setComorbiditiesHiv(defaultHivComorbidities);

        const defaultDiabetesAfter =
          data?.section5?.diabetesAfter === "After"
            ? "After"
            : data?.section5?.diabetesAfter === "NAV"
              ? "NAV"
              : "";
        setDiabetesAfter(defaultDiabetesAfter);

        const defaultHypertensionAfter =
          data?.section5?.hypertensionAfter === "After"
            ? "After"
            : data?.section5?.hypertensionAfter === "NAV"
              ? "NAV"
              : "";
        setHypertensionAfter(defaultHypertensionAfter);

        const defaultDysliAfter =
          data?.section5?.dysliAfter === "After"
            ? "After"
            : data?.section5?.dysliAfter === "NAV"
              ? "NAV"
              : "";
        setDyslipidemiaAfter(defaultDysliAfter);

        const defaultCoronaryAfter =
          data?.section5?.coronaryAfter === "After"
            ? "After"
            : data?.section5?.coronaryAfter === "NAV"
              ? "NAV"
              : "";
        setCoronaryAfter(defaultCoronaryAfter);

        const defaultPeripheralAfter =
          data?.section5?.peripheralAfter === "After"
            ? "After"
            : data?.section5?.peripheralAfter === "NAV"
              ? "NAV"
              : "";
        setPeripheralAfter(defaultPeripheralAfter);

        const defaultHIVAfter =
          data?.section5?.hivAfter === "After"
            ? "After"
            : data?.section5?.hivAfter === "NAV"
              ? "NAV"
              : "";
        setHIVAfter(defaultHIVAfter);
        // const defaultCheck =
        //   onlyData?.section5?.isChecked === true ? true : false;
        // setIsChecked(defaultCheck);
        const defaultAlcohol =
          data?.section5?.alcoholConsumptionValue === "No"
            ? "No"
            : data?.section5?.alcoholConsumptionValue === "Yes"
              ? "Yes"
              : data?.section5?.alcoholConsumptionValue ===
                "history of more than 3 drinks per day for men or more than 2 drinks per day for women"
                ? "history of more than 3 drinks per day for men or more than 2 drinks per day for women"
                : data?.section5?.alcoholConsumptionValue ===
                  "documentation of alcoholistm/alcoholic abuse in progress notes"
                  ? "documentation of alcoholistm/alcoholic abuse in progress notes"
                  : data?.section5?.alcoholConsumptionValue ===
                    "enrollment in rehabilitation"
                    ? "enrollment in rehabilitation"
                    : data?.section5?.alcoholConsumptionValue ===
                      "history of alcoholic hepatitis"
                      ? "history of alcoholic hepatitis"
                      : data?.section5?.alcoholConsumptionValue === "Unknown"
                        ? "Unknown"
                        : "";
        setAlcoholConsumptionValue(defaultAlcohol);
        const defaultDiagnosisInformationValue =
          data?.section5?.diagnosisInformationValue ===
            "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)"
            ? "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)"
            : data?.section5?.diagnosisInformationValue === "Other(specify)"
              ? "Other(specify)"
              : data?.section5?.diagnosisInformationValue === "Imaging"
                ? "Imaging"
                : data?.section5?.diagnosisInformationValue === "Unknown"
                  ? "Unknown"
                  : "";
        setDiagnosisInformationValue(defaultDiagnosisInformationValue);

        const defaultTPrimaryValue =
          data?.section5?.tPrimaryValue === "TX"
            ? "TX"
            : data?.section5?.tPrimaryValue === "T0"
              ? "T0"
              : data?.section5?.tPrimaryValue === "T1"
                ? "T1"
                : data?.section5?.tPrimaryValue === "T2"
                  ? "T2"
                  : data?.section5?.tPrimaryValue === "T3"
                    ? "T3"
                    : data?.section5?.tPrimaryValue === "T4"
                      ? "T4"
                      : "";
        setTPrimaryValue(defaultTPrimaryValue);
        const defaultNRegionalValue =
          data?.section5?.nRegionalValue === "NX"
            ? "NX"
            : data?.section5?.nRegionalValue === "N0"
              ? "N0"
              : data?.section5?.nRegionalValue === "N1"
                ? "N1"
                : "";
        setNRegionalValue(defaultNRegionalValue);

        const defaultMRegionalValue =
          data?.section5?.mRegionalValue === "MX"
            ? "MX"
            : data?.section5?.mRegionalValue === "M0"
              ? "M0"
              : data?.section5?.mRegionalValue === "M1"
                ? "M1"
                : "";
        setMRegionalValue(defaultMRegionalValue);

        const defaultAnatomicStageTNM =
          data?.section5?.anatomicStageTNM === "Stage I(T1 N0 M0)"
            ? "Stage I(T1 N0 M0)"
            : data?.section5.anatomicStageTNM === "Stage II(T2 N0 M0)"
              ? "Stage II(T2 N0 M0)"
              : data?.section5?.anatomicStageTNM === "Stage IIIA(T3a N0 M0)"
                ? "Stage IIIA(T3a N0 M0)"
                : data?.section5?.anatomicStageTNM === "Stage IIIB(T3b N0 M0)"
                  ? "Stage IIIB(T3b N0 M0)"
                  : data?.section5?.anatomicStageTNM === "Stage IIIC(T4 N0 M0)"
                    ? "Stage IIIC(T4 N0 M0)"
                    : data?.section5?.anatomicStageTNM === "Stage IVA(Any T N1 M0)"
                      ? "Stage IVA(Any T N1 M0)"
                      : data?.section5?.anatomicStageTNM === "Stage IVB(Any T Any N M1)"
                        ? "Stage IVB(Any T Any N M1)"
                        : data?.section5?.anatomicStageTNM === "NAV/Cannot be staged"
                          ? "NAV/Cannot be staged"
                          : "";
        setAnatomicStageTNM(defaultAnatomicStageTNM);

        const defaultTumorDiffValue =
          data?.section5?.tumorDiffValue === "Well"
            ? "Well"
            : data?.section5?.tumorDiffValue === "Moderate"
              ? "Moderate"
              : data?.section5?.tumorDiffValue === "Poor"
                ? "Poor"
                : data?.section5?.tumorDiffValue === "Nav"
                  ? "Nav"
                  : data?.section5?.tumorDiffValue === "Undifferentiated/anaplastic"
                    ? "Undifferentiated/anaplastic"
                    : "";

        setTumorDiffValue(defaultTumorDiffValue);

        const defaultEcogPerformance =
          data?.section5?.ecogperformace === "0 (KPS 90 or 100)"
            ? "0 (KPS 90 or 100)"
            : data?.section5?.ecogperformace === "1 (KPS 70 or 80)"
              ? "1 (KPS 70 or 80)"
              : data?.section5?.ecogperformace === "2 (KPS 50 or 60)"
                ? "2 (KPS 50 or 60)"
                : data?.section5?.ecogperformace === "3 (KPS 30 or 40)"
                  ? "3 (KPS 30 or 40)"
                  : data?.section5?.ecogperformace === "4 (KPS 10 or 20)"
                    ? "4 (KPS 10 or 20)"
                    : data?.section5?.ecogperformace === "5 (KPS 0 = dead)"
                      ? "5 (KPS 0 = dead)"
                      : "";
        setEcogPerformace(defaultEcogPerformance);

        const defaultTumorStageValue =
          data?.section5?.tumorStageValue ===
            "single(with or without microvascular invasion)"
            ? "single(with or without microvascular invasion)"
            : data?.section5?.tumorStageValue ===
              "3 tumors 3cm (≤ 3 tumors and none is > 3 cm with or without microvascular invasion)"
              ? "3 tumors 3cm (≤ 3 tumors and none is > 3 cm with or without microvascular invasion)"
              : data?.section5?.tumorStageValue ===
                "Large multinodular(> 3 tumors ≥2 tumors any larger than 3 cm with or without microvascular invasion )"
                ? "Large multinodular(> 3 tumors ≥2 tumors any larger than 3 cm with or without microvascular invasion )"
                : data?.section5?.tumorStageValue ===
                  "Vascular invasion or extrahepatic spread (only macrovascular invasion of great vessels or mets)"
                  ? "Vascular invasion or extrahepatic spread (only macrovascular invasion of great vessels or mets)"
                  : data?.section5?.tumorStageValue === "Any"
                    ? "Any"
                    : "";

        setTumorStageValue(defaultTumorStageValue);

        const defaultTypeOfVascular =
          data?.section5?.typeOfVascular ===
            "Macrovascular invasion: radiographic and vascular invasion based on large"
            ? "Macrovascular invasion: radiographic and vascular invasion based on large"
            : data?.section5?.typeOfVascular ===
              "Vessel disease seen on imaging at the time of diagnosis.(Outside Milan)"
              ? "Vessel disease seen on imaging at the time of diagnosis.(Outside Milan)"
              : data?.section5?.typeOfVascular ===
                "Extrahepatic spread(outside Milan)"
                ? "Extrahepatic spread(outside Milan)"
                : "";

        setTypeOfVascular(defaultTypeOfVascular);

        const defaultMicrovascular =
          data?.section5?.microvascularInvasion === "Yes"
            ? "Yes"
            : data?.section5.microvascularInvasion === "No"
              ? "No"
              : data?.section5?.microvascularInvasion ===
                "Not enough information from histology"
                ? "Not enough information from histology"
                : data?.section5?.microvascularInvasion ===
                  "Histology is not available"
                  ? "Histology is not available"
                  : "";

        setMicrovascularInvasion(defaultMicrovascular);

        const defaultTumorWithinMilan =
          data?.section5?.tumorWithinMilan ===
            `Yes (single lesion 5 cm or less, OR up to 3 separate lesion none larger than 3 cm, AND Nomacroscopic vascular invasion or distant metastases): Microvascular invasion is OK`
            ? `Yes (single lesion 5 cm or less, OR up to 3 separate lesion none larger than 3 cm, AND Nomacroscopic vascular invasion or distant metastases): Microvascular invasion is OK`
            : data?.section5?.tumorWithinMilan ===
              `No (single lesion>5 cm, OR >3 separate lesions any larger than 3 cm, OR evidence of macroscopic vascular invasion or distant metastases)`
              ? `No (single lesion>5 cm, OR >3 separate lesions any larger than 3 cm, OR evidence of macroscopic vascular invasion or distant metastases)`
              : data?.section5?.tumorWithinMilan === "Not enough information"
                ? "Not enough information"
                : "";
        setTumorWithinMilan(defaultTumorWithinMilan);

        const defaultChildPughClassfication =
          data?.section5?.childPughClassfication === "Child A"
            ? "Child A"
            : data?.section5?.childPughClassfication === "Child A-B"
              ? "Child A-B"
              : data?.section5?.childPughClassfication === "Child B"
                ? "Child B"
                : data?.section5?.childPughClassfication === "Child C"
                  ? "Child C"
                  : data?.section5?.childPughClassfication === "Unknown"
                    ? "Unknown"
                    : "";

        setChildPughClassfication(defaultChildPughClassfication);

        const defaultBarcelonaClinic =
          data?.section5?.barcelonaClinic ===
            "Stage 0: Very early HCC (all criteria should be fulfilled)"
            ? "Stage 0: Very early HCC (all criteria should be fulfilled)"
            : data?.section5?.barcelonaClinic ===
              "Stage A: early HCC (all criteria should be fulfilled)"
              ? "Stage A: early HCC (all criteria should be fulfilled)"
              : data?.section5?.barcelonaClinic ===
                "Stage B: Intermediate HCC (all criteria should be fulfilled)"
                ? "Stage B: Intermediate HCC (all criteria should be fulfilled)"
                : data?.section5?.barcelonaClinic ===
                  "Stage C: advanced HCC(at least one criteria ECOG 1-2 or vascular invasion/extrahepatic spread)"
                  ? "Stage C: advanced HCC(at least one criteria ECOG 1-2 or vascular invasion/extrahepatic spread)"
                  : data?.section5?.barcelonaClinic ===
                    "Stage D: end-stage HCC(at least one criteria ECOG 3-4 or Child C)"
                    ? "Stage D: end-stage HCC(at least one criteria ECOG 3-4 or Child C)"
                    : data?.section5?.barcelonaClinic ===
                      "Not Available/cannot be calculated"
                      ? "Not Available/cannot be calculated"
                      : "";

        setBarcelonaClinic(defaultBarcelonaClinic);

        const defaultFattyLiverCLD =
          data?.section6?.fattyLiverCLD === "Yes"
            ? "Yes"
            : data?.section6?.fattyLiverCLD === "No"
              ? "No"
              : data?.section6?.fattyLiverCLD === "Unknown"
                ? "Unknown"
                : "";
        setFattyLiverCLD(defaultFattyLiverCLD);

        const defaultFattyLiverRadioLast =
          data?.section6?.fattyLiverRadioLast === "Imaging"
            ? "Imaging"
            : data?.section6?.fattyLiverRadioLast === "Biopsy"
              ? "Biopsy"
              : data?.section6?.fattyLiverRadioLast === "Clinical"
                ? "Clinical"
                : data?.section6?.fattyLiverRadioLast === "Other"
                  ? "Other"
                  : data?.section6?.fattyLiverRadioLast === "Other"
                    ? "Other"
                    : data?.section6?.fattyLiverRadioLast === "NA"
                      ? "NA"
                      : "";

        setFattyLiverRadioLast(defaultFattyLiverRadioLast);
        const defaultCirrhosisStatusValue =
          data?.section6?.cirrhosisStatusValue === "Yes"
            ? "Yes"
            : data?.section6?.cirrhosisStatusValue === "No"
              ? "No"
              : data?.section6?.cirrhosisStatusValue === "Unknown/unclassified"
                ? "Unknown/unclassified"
                : "";

        setCirrhosisStatusValue(defaultCirrhosisStatusValue);

        const defaultMittalCriteriaValue =
          data?.section6?.mittalCriteriaValue ===
            "level 1 evidence (very high probability) of no cirrhosis"
            ? "level 1 evidence (very high probability) of no cirrhosis"
            : data?.section6?.mittalCriteriaValue ===
              "level 2 evidence (high probability) of no cirrhosis, which lacks histology but is based on imaging and laboratory criteria"
              ? "level 2 evidence (high probability) of no cirrhosis, which lacks histology but is based on imaging and laboratory criteria"
              : data?.section6?.mittalCriteriaValue ===
                "confirmed cirrhosis, which is based on histological, imaging, clinical or laboratory criteria"
                ? "confirmed cirrhosis, which is based on histological, imaging, clinical or laboratory criteria"
                : data?.section6?.mittalCriteriaValue ===
                  "*Unclassified (insufficient data to classify into any of the above cirhosisi categories)"
                  ? "*Unclassified (insufficient data to classify into any of the above cirhosisi categories)"
                  : "";

        setMittalCriteriaValue(defaultMittalCriteriaValue);

        const defaultUnderlyingEtiologyValue =
          data?.section6?.underlyingEtiologyValue === "HCV (Hepatitis C virus)"
            ? "HCV (Hepatitis C virus)"
            : data?.section6?.underlyingEtiologyValue ===
              "HBV (Hepatitis B virus)"
              ? "HBV (Hepatitis B virus)"
              : data?.section6?.underlyingEtiologyValue === "Alcohol"
                ? "Alcohol"
                : data?.section6?.underlyingEtiologyValue ===
                  "NAFLD (Non-alcoholic fatty liver disease)"
                  ? "NAFLD (Non-alcoholic fatty liver disease)"
                  : data?.section6?.underlyingEtiologyValue ===
                    "AIH (Autoimmune hepatitis)"
                    ? "AIH (Autoimmune hepatitis)"
                    : data?.section6?.underlyingEtiologyValue ===
                      "PBC (Primary biliary cholangitis/Primary biliary cirrhosis)"
                      ? "PBC (Primary biliary cholangitis/Primary biliary cirrhosis)"
                      : data?.section6?.underlyingEtiologyValue ===
                        "PSC (Primary sclerosing cholangitis)"
                        ? "PSC (Primary sclerosing cholangitis)"
                        : data?.section6?.underlyingEtiologyValue === "Hemochromatosis"
                          ? "Hemochromatosis"
                          : data?.section6?.underlyingEtiologyValue ===
                            "Alpha 1 antitrypsin deficiency"
                            ? "Alpha 1 antitrypsin deficiency"
                            : data?.section6?.underlyingEtiologyValue === "Other etiologies"
                              ? "Other etiologies"
                              : data?.section6?.underlyingEtiologyValue ===
                                "Idiopathic (enougth information but no obviouse etiology)"
                                ? "Idiopathic (enougth information but no obviouse etiology)"
                                : data?.section6?.underlyingEtiologyValue ===
                                  "Unknown etiology(not enough information)"
                                  ? "Unknown etiology(not enough information)"
                                  : "";

        setUnderlyingEtiologyValue(defaultUnderlyingEtiologyValue);

        const defaultComplicationCLD =
          data?.section6?.complicationCLD === "Ascites"
            ? "Ascites"
            : data?.section6?.complicationCLD === "Encephalopathy"
              ? "Encephalopathy"
              : data?.section6?.complicationCLD === "Varices"
                ? "Varices"
                : data?.section6?.complicationCLD ===
                  "SBP (Spontaneous Bacteria Peritonitis)"
                  ? "SBP (Spontaneous Bacteria Peritonitis)"
                  : data?.section6?.complicationCLD === "Other (renal failure, etc)"
                    ? "Other (renal failure, etc)"
                    : data?.section6?.complicationCLD === "No complications occurred"
                      ? "No complications occurred"
                      : data?.section6?.complicationCLD ===
                        "Information not availabel or not applicable (Patient not cirrhosis)"
                        ? "Information not availabel or not applicable (Patient not cirrhosis)"
                        : data?.section6?.complicationCLD === "Portal vein thrombosis"
                          ? "Portal vein thrombosis"
                          : "";
        setComplicationCLD(defaultComplicationCLD);

        const defaultHccOutcomeValue =
          data?.section6?.hccOutcomeValue === "Resection"
            ? "Resection"
            : data?.section6?.hccOutcomeValue === "Liver transplantation"
              ? "Liver transplantation"
              : data?.section6?.hccOutcomeValue ===
                "Catheter delivered therapy (y90, TACE, radioembolizationetc)"
                ? "Catheter delivered therapy (y90, TACE, radioembolizationetc)"
                : data?.section6?.hccOutcomeValue === "Sorafenib"
                  ? "Sorafenib"
                  : data?.section6?.hccOutcomeValue === "Radiation(SBRT)"
                    ? "Radiation(SBRT)"
                    : data?.section6?.hccOutcomeValue === "RFA ablation"
                      ? "RFA ablation"
                      : data?.section6?.hccOutcomeValue === "Palliative/hospice care"
                        ? "Palliative/hospice care"
                        : data?.section6?.hccOutcomeValue === "Other (specify in freetext)"
                          ? "Other (specify in freetext)"
                          : data?.section6?.hccOutcomeValue ===
                            "None (if patient was too sick, refused treatment,etc.)"
                            ? "None (if patient was too sick, refused treatment,etc.)"
                            : data?.section6?.hccOutcomeValue ===
                              "Unknown (if patient was lost to follow-up or information not available in the chart)"
                              ? "Unknown (if patient was lost to follow-up or information not available in the chart)"
                              : data?.section6?.hccOutcomeValue === "Microwave ablation"
                                ? "Microwave ablation"
                                : "";
        setHccOutcomeValue(defaultHccOutcomeValue);

        const defaultResectionPerformed =
          data?.section6?.resectionPerformed === "None/F0"
            ? "None/F0"
            : data?.section6?.resectionPerformed === "Mild/stage 1/F1"
              ? "Mild/stage 1/F1"
              : data?.section6?.resectionPerformed === "Moderate/stage 2/F2"
                ? "Moderate/stage 2/F2"
                : data?.section6?.resectionPerformed ===
                  "Bridiging fibrosis/stage 3F3"
                  ? "Bridiging fibrosis/stage 3F3"
                  : data?.section6?.resectionPerformed === "Cirrhosis/stage 4/F4"
                    ? "Cirrhosis/stage 4/F4"
                    : data?.section6?.resectionPerformed === "Unknown"
                      ? "Unknown"
                      : "";

        setResectionPerformed(defaultResectionPerformed);

        const defaultLiverTransplantValue =
          data?.section6?.liverTransplantValue === "None/F0"
            ? "None/F0"
            : data?.section6?.liverTransplantValue === "Mild/stage 1/F1"
              ? "Mild/stage 1/F1"
              : data?.section6?.liverTransplantValue === "Moderate/stage 2/F2"
                ? "Moderate/stage 2/F2"
                : data?.section6?.liverTransplantValue ===
                  "Bridiging fibrosis/stage 3F3"
                  ? "Bridiging fibrosis/stage 3F3"
                  : data?.section6?.liverTransplantValue === "Cirrhosis/stage 4/F4"
                    ? "Cirrhosis/stage 4/F4"
                    : data?.section6?.liverTransplantValue === "Unknown"
                      ? "Unknown"
                      : "";
        setLiverTransplantValue(defaultLiverTransplantValue);

        const defaultRecurrenceValue =
          data?.section6?.recurrenceValue === "Yes once"
            ? "Yes once"
            : data?.section6?.recurrenceValue === "Yes more than once"
              ? "Yes more than once"
              : data?.section6?.recurrenceValue === "No"
                ? "No"
                : data?.section6?.recurrenceValue === "Unknown/patient not"
                  ? "Unknown/patient not"
                  : "";

        setRecurrenceValue(defaultRecurrenceValue);

        const defaultSurvivalStatusValue =
          data?.section6?.survivalStatusValue === "Alive"
            ? "Alive"
            : data?.section6?.survivalStatusValue === "Deceased"
              ? "Deceased"
              : data?.section6?.survivalStatusValue === "Unknown"
                ? "Unknown"
                : "";
        setSurvivalStatusValue(defaultSurvivalStatusValue);

        const defaultScreeningQuestion =
          data?.section6?.screeningQuestion === "Part of screening"
            ? "Part of screening"
            : data?.section6?.screeningQuestion === "Incidental"
              ? "Incidental"
              : data?.section6?.screeningQuestion === "Symptoms work-up"
                ? "Symptoms work-up"
                : data?.section6?.screeningQuestion === "Other"
                  ? "Other"
                  : data?.section6?.screeningQuestion === "NA/Unknown"
                    ? "NA/Unknown"
                    : "";
        setScreeningQuestionValue(defaultScreeningQuestion);

        const defaultHistoryHIV =
          data?.section7?.historyHIV === "Yes"
            ? "Yes"
            : data?.section7?.historyHIV === "No"
              ? "No"
              : "";

        setHistoryHiv(defaultHistoryHIV);

        const defaultIsDateHCVDiagnosis =
          data?.section8?.isDateHCVDiagnosis === "Yes"
            ? "Yes"
            : data?.section8?.isDateHCVDiagnosis === "No"
              ? "No"
              : data?.section8?.isDateHCVDiagnosis === "Unknown"
                ? "Unknown"
                : "";
        setIsDateHCVDiagnosis(defaultIsDateHCVDiagnosis);

        const defaultIsHCViralCVirus =
          data?.section8?.isHCViralCVirus === "Yes"
            ? "Yes"
            : data?.section8?.isHCViralCVirus === "No"
              ? "No"
              : data?.section8?.isHCViralCVirus === "Unknown"
                ? "Unknown"
                : "";
        setIsHCViralCVirus(defaultIsHCViralCVirus);

        const defaultHcvGenotype =
          data?.section8?.hcvGenotype === "1a"
            ? "1a"
            : data?.section8?.hcvGenotype === "1b"
              ? "1b"
              : data?.section8?.hcvGenotype === "1 unknown"
                ? "1 unknown"
                : data?.section8?.hcvGenotype === "2"
                  ? "2"
                  : data?.section8?.hcvGenotype === "3"
                    ? "3"
                    : data?.section8?.hcvGenotype === "4"
                      ? "4"
                      : data?.section8?.hcvGenotype === "5"
                        ? "5"
                        : data?.section8?.hcvGenotype === "6"
                          ? "6"
                          : data?.section8?.hcvGenotype === "Unknown"
                            ? "Unknown"
                            : "";
        setHCVGenotype(defaultHcvGenotype);

        const defaultWasHCVReceivedBeforeAfter =
          data?.section8?.wasHCVReceivedBeforeAfter === "Before"
            ? "Before"
            : data?.section8?.wasHCVReceivedBeforeAfter === "After"
              ? "After"
              : data?.section8?.wasHCVReceivedBeforeAfter === "Not applicable"
                ? "Not applicable"
                : "";

        setWasHCVReceivedBeforeAfter(defaultWasHCVReceivedBeforeAfter);

        const defaultHcvTreatmentCVirus =
          data?.section8?.hcvTreatmentCVirus === "DAA (direct acting antiviral)"
            ? "DAA (direct acting antiviral)"
            : data?.section8?.hcvTreatmentCVirus === "Protease inhibitor"
              ? "Protease inhibitor"
              : data?.section8?.hcvTreatmentCVirus === "Peg interferon"
                ? "Peg interferon"
                : data?.section8?.hcvTreatmentCVirus === "Ribavirin"
                  ? "Ribavirin"
                  : data?.section8?.hcvTreatmentCVirus === "Interferon alpha"
                    ? "Interferon alpha"
                    : data?.section8?.hcvTreatmentCVirus === "Unknown"
                      ? "Unknown"
                      : data?.section8?.hcvTreatmentCVirus === "No treatment received"
                        ? "No treatment received"
                        : "";
        setHcvTreatmentCVirus(defaultHcvTreatmentCVirus);

        const defaultHcvViralLoadAfterTreatment =
          data?.section8?.hcvViralLoadAfterTreatment === "Yes"
            ? "Yes"
            : data?.section8?.hcvViralLoadAfterTreatment === "No"
              ? "No"
              : data?.section8?.hcvViralLoadAfterTreatment === "Unknown"
                ? "Unknown"
                : "";
        setHcvViralLoadAfterTreatment(defaultHcvViralLoadAfterTreatment);

        const defaultSustainedHCV =
          data?.section8?.sustainedHCV === "Yes"
            ? "Yes"
            : data?.section8?.sustainedHCV === "No"
              ? "No"
              : data?.section8?.sustainedHCV === "Unknown"
                ? "Unknown"
                : "";
        setSustainedHcv(defaultSustainedHCV);

        const defaultIsDateHBVDiagnosis =
          data?.section9?.isDateHBVDiagnosis === "Yes"
            ? "Yes"
            : data?.section9?.isDateHBVDiagnosis === "No"
              ? "No"
              : data?.section9?.isDateHBVDiagnosis === "Unknown"
                ? "Unknown"
                : "";

        setIsDateHBVDiagnosis(defaultIsDateHBVDiagnosis);

        const defaultIsHBViralBVirus =
          data?.section9?.isHBViralBVirus === "Yes"
            ? "Yes"
            : data?.section9?.isHBViralBVirus === "No"
              ? "No"
              : data?.section9?.isHBViralBVirus === "Unknown"
                ? "Unknown"
                : "";
        setIsHBViralBVirus(defaultIsHBViralBVirus);

        const defaultWasHBVReceivedBeforeAfter =
          data?.section9?.wasHBVReceivedBeforeAfter === "Before"
            ? "Before"
            : data?.section9?.wasHBVReceivedBeforeAfter === "After"
              ? "After"
              : data?.section9?.wasHBVReceivedBeforeAfter === "Not applicable"
                ? "Not applicable"
                : "";

        setWasHBVReceivedBeforeAfter(defaultWasHBVReceivedBeforeAfter);

        const defaultHcvTreatmentBVirus =
          data?.section9?.hcvTreatmentBVirus === "Lamivudine"
            ? "Lamivudine"
            : data?.section9?.hcvTreatmentBVirus === "Tenofovir"
              ? "Tenofovir"
              : data?.section9?.hcvTreatmentBVirus === "Entecavir"
                ? "Entecavir"
                : data?.section9?.hcvTreatmentBVirus === "Interferon alpha"
                  ? "Interferon alpha"
                  : data?.section9?.hcvTreatmentBVirus === "Unknown"
                    ? "Unknown"
                    : data?.section9?.hcvTreatmentBVirus === "No treatment received"
                      ? "No treatment received"
                      : "";
        setHcvTreatmentBVirus(defaultHcvTreatmentBVirus);

        const defaultHbvViralLoadAfterTreatment =
          data?.section9?.hbvViralLoadAfterTreatment === "Yes"
            ? "Yes"
            : data?.section9?.hbvViralLoadAfterTreatment === "No"
              ? "No"
              : data?.section9?.hbvViralLoadAfterTreatment === "Unknown"
                ? "Unknown"
                : "";
        setHbvViralLoadAfterTreatment(defaultHbvViralLoadAfterTreatment);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [formID, role]);

  // console.log("only", onlyData);
  //  -------
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

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
  }, []);

  // ------------
  const navigate = useNavigate();
  const reviewButton = (dispatchedTo) => {
    const token = Cookies.get('tkn');
    if(!token) {
      navigate('/login');
    }
    // // console.log(role, dispatchedFrom);
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

    fetch(`${apiUrl}/eCRF-rest-service/addRecord`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: formID,
        createDate: onlyData.createDate,
        status: `at ` + dispatchedTo,
        dispatchDate: formattedDate,
        // createDate: "2024-03-02 00:00:00",
        dispatchedTo,
        dispatchedFrom: role,
        // comments: { commentsData },
        comments: {
          ...onlyData.comments,
          ...(commentsData && { commentsData }),
        },
        section1: {
          ...onlyData.section1,
          ...(studyTitle && { studyTitle }),
          ...(projectNo && { projectNo }),
          ...(siteId && { siteId }),
          ...(studyDate && { studyDate }),
        },
        section2: {
          ...onlyData.section2,
          ...(subjectId && { subjectId }),
          ...(subjectCounter && { subjectCounter }),
          ...(subjectGender && { subjectGender }),
          ...(subjectYear && { subjectYear }),
          ...(subjectUnknown && { subjectUnknown }),
          ...(nationality && { nationality }),
          ...(otherCheck && { otherCheck }),
          ...(ethnicity && { ethnicity }),
          ...(subjectOtherText && { subjectOtherText }),
          ...(placeOfBirthCity && { placeOfBirthCity }),
          ...(placeOfBirthState && { placeOfBirthState }),
          ...(residencyCity && { residencyCity }),
          ...(residencyState && { residencyState }),
        },
        section3: {
          ...onlyData.section3,
          ...(dateOfHcc && { dateOfHcc }),
          ...(baseLineIfDate && { baseLineIfDate }),
          ...(baseLineIfDateRadio && { baseLineIfDateRadio }),
          ...(baseLineAgeOfHcc && { baseLineAgeOfHcc }),
          ...(baseLineHeight && { baseLineHeight }),
          ...(weightHggBaseLine && { weightHggBaseLine }),
          ...(bmiBaseLine && { bmiBaseLine }),
          ...(insuranceValue && { insuranceValue }),
          ...(insuraceValueOtherBaseline && { insuraceValueOtherBaseline }),
          ...(insuraceDetailsBaseLine && { insuraceDetailsBaseLine }),
        },
        section4: {
          ...onlyData.section4,
          ...(modelEndStageLab && { modelEndStageLab }),
          ...(fib4Lab && { fib4Lab }),
          ...(astPlateletLab && { astPlateletLab }),
          ...(alanineValue && { alanineValue }),
          ...(alanineFrom && { alanineFrom }),
          ...(alanineTo && { alanineTo }),
          ...(aspartateValue && { aspartateValue }),
          ...(aspartateFrom && { aspartateFrom }),
          ...(aspartateTo && { aspartateTo }),
          ...(bilirubinValue && { bilirubinValue }),
          ...(bilirubinFrom && { bilirubinFrom }),
          ...(bilirubinTo && { bilirubinTo }),
          ...(alkalineValue && { alkalineValue }),
          ...(alkalineFrom && { alkalineFrom }),
          ...(alkalineTo && { alkalineTo }),
          ...(albuminValue && { albuminValue }),
          ...(albuminFrom && { albuminFrom }),
          ...(albuminTo && { albuminTo }),
          ...(platelatesValue && { platelatesValue }),
          ...(platelatesFrom && { platelatesFrom }),
          ...(platelatesTo && { platelatesTo }),
          ...(creatinineValue && { creatinineValue }),
          ...(creatinineFrom && { creatinineFrom }),
          ...(creatinineTo && { creatinineTo }),
          ...(prothrombinValue && { prothrombinValue }),
          ...(prothrombinFrom && { prothrombinFrom }),
          ...(prothrombinTo && { prothrombinTo }),
          ...(internationalValue && { internationalValue }),
          ...(internationalFrom && { internationalFrom }),
          ...(internationalTo && { internationalTo }),
          ...(alphaValue && { alphaValue }),
          ...(alphaFrom && { alphaFrom }),
          ...(alphaTo && { alphaTo }),
          ...(sodiumValue && { sodiumValue }),
          ...(sodiumFrom && { sodiumFrom }),
          ...(sodiumTo && { sodiumTo }),
          ...(bloodUreaValue && { bloodUreaValue }),
          ...(bloodUreaFrom && { bloodUreaFrom }),
          ...(bloodUreaTo && { bloodUreaTo }),
          ...(cholesterolValue && { cholesterolValue }),
          ...(cholesterolFrom && { cholesterolFrom }),
          ...(cholesterolTo && { cholesterolTo }),
          ...(triglyceridesValue && { triglyceridesValue }),
          ...(triglyceridesFrom && { triglyceridesFrom }),
          ...(triglyceridesTo && { triglyceridesTo }),
          ...(highDensityValue && { highDensityValue }),
          ...(highDenistyFrom && { highDenistyFrom }),
          ...(highDensityTo && { highDensityTo }),
          ...(lowDensityValue && { lowDensityValue }),
          ...(lowDensityFrom && { lowDensityFrom }),
          ...(lowDensityTo && { lowDensityTo }),
          ...(modelEndStageTextArea && { modelEndStageTextArea }),
          ...(meldScoreLab && { meldScoreLab }),
        },
        section5: {
          ...onlyData.section5,
          ...(diabetesAfter && { diabetesAfter }),
          ...(hypertensionAfter && { hypertensionAfter }),
          ...(dysliAfter && { dysliAfter }),
          ...(coronaryAfter && { coronaryAfter }),
          ...(peripheralAfter && { peripheralAfter }),
          ...(hivAfter && { hivAfter }),
          ...(yesDiabetesInput && { yesDiabetesInput }),
          ...(yesHyperTensionInput && { yesHyperTensionInput }),
          ...(yesDyslipidemiaInput && { yesDyslipidemiaInput }),
          ...(yesCoronaryInput && { yesCoronaryInput }),
          ...(yesPeripheralInput && { yesPeripheralInput }),
          ...(yesHivInput && { yesHivInput }),
          ...(diabetesComorbidities && { diabetesComorbidities }),
          ...(hypertensionComorbidities && { hypertensionComorbidities }),
          ...(dyslipidemiaComorbidities && { dyslipidemiaComorbidities }),
          ...(coronaryComorbidities && { coronaryComorbidities }),
          ...(peripheralComorbidities && { peripheralComorbidities }),
          ...(hivComorbidities && { hivComorbidities }),
          ...(isChecked && { isChecked }),
          ...(yesLocationSiteValue && { yesLocationSiteValue }),
          ...(yesStageValue && { yesStageValue }),
          ...(yesYearOfDiagnosis && { yesYearOfDiagnosis }),
          ...(alcoholConsumptionValue && { alcoholConsumptionValue }),
          ...(diagnosisInformationValue && { diagnosisInformationValue }),
          ...(hccDiagnosisInfoValueOtherSpecify && {
            hccDiagnosisInfoValueOtherSpecify,
          }),
          ...(largeTurmorValue && { largeTurmorValue }),
          ...(tPrimaryValue && { tPrimaryValue }),
          ...(nRegionalValue && { nRegionalValue }),
          ...(mRegionalValue && { mRegionalValue }),
          ...(anatomicStageTNM && { anatomicStageTNM }),
          ...(tumorDiffValue && { tumorDiffValue }),
          ...(ecogperformace && { ecogperformace }),
          ...(tumorStageValue && { tumorStageValue }),
          ...(typeOfVascular && { typeOfVascular }),
          ...(microvascularInvasion && { microvascularInvasion }),
          ...(tumorWithinMilan && { tumorWithinMilan }),
          ...(childPughClassfication && { childPughClassfication }),
          ...(barcelonaClinic && { barcelonaClinic }),
        },
        section6: {
          ...onlyData.section6,
          ...(fattyLiverCLD && { fattyLiverCLD }),
          ...(fattyLiverRadioLast && { fattyLiverRadioLast }),
          ...(fattyLiverDiagnosticFreeText && { fattyLiverDiagnosticFreeText }),
          ...(cirrhosisStatusValue && { cirrhosisStatusValue }),
          ...(mittalCriteriaValue && { mittalCriteriaValue }),
          ...(underlyingEtiologyValue && { underlyingEtiologyValue }),
          ...(etiologyCirrhosisFreeValue && { etiologyCirrhosisFreeValue }),
          ...(complicationCLD && { complicationCLD }),
          ...(hccOutcomeValue && { hccOutcomeValue }),
          ...(treamentModalitiesHCC && { treamentModalitiesHCC }),
          ...(resectionPerformed && { resectionPerformed }),
          ...(liverTransplantValue && { liverTransplantValue }),
          ...(recurrenceValue && { recurrenceValue }),
          ...(selectedDateOfFirstRecurrence && {
            selectedDateOfFirstRecurrence,
          }),
          ...(survivalStatusValue && { survivalStatusValue }),
          ...(selectedDateOfDeath && { selectedDateOfDeath }),
          ...(selectedDateOfLastContact && { selectedDateOfLastContact }),
          ...(selectedDateOfRecurrenceFree && { selectedDateOfRecurrenceFree }),
          ...(selectedDateOfOverallSurvival && {
            selectedDateOfOverallSurvival,
          }),
          ...(screeningQuestion && { screeningQuestion }),
          ...(screeningQuestionNa && { screeningQuestionNa }),
        },
        section7: {
          ...onlyData.section7,
          ...(historyHIV && { historyHIV }),
          ...(yearOfHIVHCC && { yearOfHIVHCC }),
          ...(dateOfHIVDurationFrom && { dateOfHIVDurationFrom }),
          ...(dateOfHIVDurationTo && { dateOfHIVDurationTo }),
          ...(hivRNAHCC && { hivRNAHCC }),
          ...(hivCD4 && { hivCD4 }),
          ...(hivAbsoluteCD4 && { hivAbsoluteCD4 }),
          ...(hivCD4CellCount && { hivCD4CellCount }),
          ...(hivInitialHIV1 && { hivInitialHIV1 }),
          ...(maximumHIVRNA && { maximumHIVRNA }),
        },
        section8: {
          ...onlyData.section8,
          ...(isDateHCVDiagnosis && { isDateHCVDiagnosis }),
          ...(dateOfHCVCVirus && { dateOfHCVCVirus }),
          ...{ isHCViralCVirus },
          ...(HCVviralTimeOfHCCDiagnosis && { HCVviralTimeOfHCCDiagnosis }),
          ...(hcvGenotype && { hcvGenotype }),
          ...(wasHCVReceivedBeforeAfter && { wasHCVReceivedBeforeAfter }),
          ...(hcvTreatmentCVirus && { hcvTreatmentCVirus }),
          ...(hcvTreatedYear && { hcvTreatedYear }),
          ...(hcvViralLoadAfterTreatment && { hcvViralLoadAfterTreatment }),
          ...(hcvPostTreatment && { hcvPostTreatment }),
          ...(sustainedHCV && { sustainedHCV }),
          ...(yearSVRHCV && { yearSVRHCV }),
        },
        section9: {
          ...onlyData.section9,
          ...(dateOfHBVBVirus && { dateOfHBVBVirus }),
          ...(isDateHBVDiagnosis && { isDateHBVDiagnosis }),
          ...(isHBViralBVirus && { isHBViralBVirus }),
          ...(HBVviralTimeOfHCCDiagnosis && { HBVviralTimeOfHCCDiagnosis }),
          ...(wasHBVReceivedBeforeAfter && { wasHBVReceivedBeforeAfter }),
          ...(hcvTreatmentBVirus && { hcvTreatmentBVirus }),
          ...(hbvViralLoadAfterTreatment && { hbvViralLoadAfterTreatment }),
          ...(hbvPostTreatment && { hbvPostTreatment }),
          ...(dateOfHBVTreatmentYear && { dateOfHBVTreatmentYear }),
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
    if (dispatchedTo === "ROLE_DATAENTRY") {
      alert("Data Send Back To Data Entry Successfully");
      navigate("/");
    } else if (dispatchedTo === "ROLE_REVIEWER") {
      alert("Data Send Back To Reviewer Successfully");
      navigate("/");
    } else if (dispatchedTo === "qa") {
      alert("Data Submitted To QA Successfully");
      navigate("/");
    } else if (dispatchedTo === "completed") {
      alert("Data Submitted By QA Successfully");
      navigate("/");
    }
  };
  const qaButton = () => {
    navigate("/");
  };
  // console.log(isChecked);
  const tkn = Cookies.get("tkn");
  if (tkn === undefined) {
    return navigate("/login");
  }
  return (
    <div className="bg">
      <form>
        {/* studyData container */}
        <div className="study-container">
          <p>Record:{count}</p>
          <div className="studyData-container">
            <h1 className="study-txt">Study Data</h1>
            <button
              type="button"
              onClick={studyButtonHandle}
              className="study-btn"
            >
              {studyButton ? <ArrowDownward /> : <ArrowUpward />}
            </button>
          </div>
          <div className={studyButton ? "study-data" : ""}>
            <Fade>
              <div className="container-width">
                <label className="label-txt" htmlFor="study-title">
                  Study Title
                </label>
                <input
                  // value={studyTitle}
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  defaultValue={onlyData?.section1?.studyTitle}
                  onChange={(e) => setStudyTitle(e.target.value)}
                  id="study-title"
                  className="input-width"
                  type="text"
                />
              </div>
              <div className="d-subject">
                <div className="container-width">
                  <label className="label-txt" htmlFor="project-no">
                    Project No
                  </label>
                  <input
                    maxLength={10}
                    // value={projectNo}
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    defaultValue={onlyData?.section1?.projectNo || ""}
                    onChange={(e) => setProjectNo(e.target.value)}
                    id="project-no"
                    className="input-width"
                    type="text"
                  />
                </div>

                <div className="container-width">
                  <input
                    disabled
                    defaultValue={"Avant Sante Drug Development LLC"}
                    className="input-width"
                    type="text"
                  />
                </div>
              </div>
              <div className="d-subject">
                <div className="container-width">
                  <label className="label-txt" htmlFor="site-id">
                    Site ID / Name
                  </label>
                  <input
                    maxLength={3}
                    // value={siteId}
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    defaultValue={onlyData?.section1?.siteId || ""}
                    onChange={(e) => setSiteId(e.target.value)}
                    id="site-id"
                    className="input-width"
                    type="text"
                  />
                </div>
                <div className="container-width">
                  {// console.log(onlyData?.section1?.studyDate)}
                  <input
                    type="date"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    defaultValue={onlyData?.section1?.studyDate}
                    onChange={(e) => setStudyDate(e.target.value)}
                    className="input-width"
                  />
                  {/* <DatePicker
                    showYearDropdown
                    // selected={studyDate}
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    selected={onlyData?.section1?.studyDate}
                    onChange={handleStudyDate}
                    dateFormat="dd-MMM-yyyy"
                    placeholderText="DD-MMM-YYY"
                    popperPlacement="right"
                  /> */}
                </div>
              </div>
            </Fade>
          </div>
        </div>

        {/* subjectData container */}
        <div>
          <div className="study-container">
            <div className="studyData-container">
              <h1 className="study-txt">Subject Data</h1>
              <button
                onClick={subjectButtonHandle}
                className="study-btn"
                type="button"
              >
                {subjectButton ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={subjectButton ? "study-data" : ""}>
              <Fade>
                <div className="d-subject">
                  <div className="container-width">
                    <label className="label-txt" htmlFor="subject-id">
                      Subject ID
                    </label>
                    <input
                      // value={subjectId}
                      // onlyData?.section1?.siteId || ""
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      defaultValue={onlyData?.section2?.subjectId || ""}
                      onChange={(e) => setSubjectId(e.target.value)}
                      id="subject-id"
                      className="input-width"
                      type="text"
                    />
                  </div>
                  <div className="container-width">
                    <label className="label-txt" htmlFor="subject-counter">
                      Subject Counter
                    </label>
                    <input
                      required
                      disabled
                      value={onlyData?.id}
                      readOnly
                      onChange={(e) => setSubjectCounter(e.target.value)}
                      type="text"
                      id="subject-counter"
                      className="input-width"
                    />
                  </div>
                </div>
                <div className="container-width-for-chronic">
                  <div className="container-width">
                    <label
                      className="label-txt"
                      htmlFor="subject-year-of-birth"
                    >
                      Year of Birth (if available)
                    </label>
                    <input
                      disabled={
                        role === "ROLE_REVIEWER" ||
                        role === "qa" ||
                        subjectUnknown === true
                      }
                      defaultValue={onlyData?.section2?.subjectYear}
                      placeholder="YYYY"
                      type="number"
                      min={1900}
                      max={2040}
                      // value={subjectYear}
                      className="input-width"
                      onChange={(e) => setSubjectYear(e.target.value)}
                    />
                  </div>
                  <div className="container-width">
                    <label className="or-subject">or </label>
                    <input
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      defaultChecked={onlyData?.section2?.subjectUnknown}
                      onChange={() => {
                        if (subjectUnknown) {
                          setSubjectYear("");
                        }
                        setSubjectUnknown(!subjectUnknown);
                      }}
                      className="check"
                      type="checkbox"
                    />
                    <label>Unknown</label>
                  </div>
                </div>
                <div className="container-width">
                  <label className="label-txt" htmlFor="gender">
                    Sex of the patient
                  </label>
                  <div>
                    <label htmlFor="male">Male</label>
                    <input
                      id="male"
                      name="gender"
                      value={"Male"}
                      type="radio"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      // onlyData?.section1?.siteId || ""
                      checked={subjectGender === "Male"}
                      onChange={(e) => setSubjectGender(e.target.value)}
                    />
                    <label htmlFor="female">
                      {// console.log(subjectGender)}
                      <span> / </span>Female
                    </label>
                    <input
                      id="female"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={subjectGender === "Female"}
                      name="gender"
                      value={"Female"}
                      type="radio"
                      onChange={(e) => setSubjectGender(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label className="label-txt" htmlFor="nationalityy">
                      Nationality
                    </label>
                    <select
                      id="nationalityy"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="input-drop"
                    >
                      <option value={"Mexico"}>Mexico</option>
                      <option value={"Other"}>Other</option>
                    </select>
                  </div>
                  <div className="container-width">
                    <textarea
                      disabled={
                        role === "ROLE_REVIEWER" ||
                        role === "qa" ||
                        nationality !== "Other"
                      }
                      defaultValue={onlyData?.section2?.nationalityOther}
                      onChange={(e) => setNationalityOther(e.target.value)}
                      className="input-width"
                    ></textarea>
                  </div>
                </div>
                <div className="d-subject">
                  <div className="container-widthd-comorbidities">
                    <label className="label-txt">Ethnicity</label>
                    <label htmlFor="hispanic">Hispanic</label>
                    <input
                      name="et1"
                      value={"Hispanic"}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      id="hispanic"
                      type="radio"
                      onChange={(e) => {
                        const s = e.target.value;
                        if (s === "Others") {
                          setSubjectOtherText("");
                        } else {
                          setSubjectOtherText("");
                        }

                        setOtherCheck(s);
                      }}
                      className="input-checkbox"
                      checked={otherCheck === "Hispanic"}
                    />
                    <label htmlFor="latin">Latin</label>
                    <input
                      name="et1"
                      value={"Latin"}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      id="latin"
                      type="radio"
                      onChange={(e) => {
                        const s = e.target.value;
                        if (s === "Others") {
                          setSubjectOtherText("");
                        } else {
                          setSubjectOtherText("");
                        }

                        setOtherCheck(s);
                      }}
                      className="input-checkbox"
                      checked={otherCheck === "Latin"}
                    />

                    <label htmlFor="other">Others</label>
                    <input
                      name="et1"
                      value={"Others"}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      id="other"
                      type="radio"
                      onChange={(e) => setOtherCheck(e.target.value)}
                      className="input-checkbox"
                      checked={otherCheck === "Others"}
                    />
                    <div className="input-width">
                      <textarea
                        value={subjectOtherText}
                        defaultValue={onlyData?.section2?.subjectOtherText}
                        onChange={(e) => setSubjectOtherText(e.target.value)}
                        disabled={
                          otherCheck !== "Others" ||
                          role === "ROLE_REVIEWER" ||
                          role === "qa"
                        }
                        className="input-width"
                      ></textarea>
                      {// console.log(otherCheck)}
                    </div>
                  </div>
                  {/* <div className="container-width">
                    
                  </div> */}
                </div>
                <div className="d-subject">
                  <div className="container-width2">
                    <label className="label-txt" htmlFor="place-birth">
                      Place of birth
                    </label>
                    <input
                      // value={placeOfBirthCity}
                      maxLength={30}
                      defaultValue={onlyData?.section2?.placeOfBirthCity || ""}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      onChange={(e) => setPlaceOfBirthCity(e.target.value)}
                      id="place-birth"
                      className="input-width"
                      type="text"
                    />
                    <label className="city-label">(City)/</label>
                  </div>
                  <div className="container-width2">
                    <input
                      id="place-state"
                      maxLength={30}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      defaultValue={onlyData?.section2?.placeOfBirthState || ""}
                      onChange={(e) => setPlaceOfBirthState(e.target.value)}
                      // value={placeOfBirthState}
                      type="text"
                      className="input-width"
                    />
                    <label className="city-label" htmlFor="place-state">
                      (State)
                    </label>
                  </div>
                </div>
                <div className="d-subject">
                  <div className="container-width2">
                    <label className="label-txt">
                      Residence City and State
                    </label>
                    <input
                      id="residency-city"
                      // value={residencyCity}
                      maxLength={30}
                      defaultValue={onlyData?.section2?.residencyCity || ""}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      onChange={(e) => setResidencyCity(e.target.value)}
                      className="input-width"
                      type="text"
                    />
                    <label className="city-label" htmlFor="residency-city">
                      (City)/
                    </label>
                  </div>
                  <div className="container-width2">
                    <input
                      maxLength={30}
                      onChange={(e) => setResidencyState(e.target.value)}
                      // value={residencyState}
                      defaultValue={onlyData?.section2?.residencyState || ""}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      id="residency-state"
                      type="text"
                      className="input-width"
                    />
                    <label className="city-label" htmlFor="residency-state">
                      (State)
                    </label>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
        {/* Baseline Characteristics container */}
        <div>
          <div className="study-container">
            <div className="studyData-container">
              <h1 className="study-txt">Baseline Characteristics </h1>
              <button
                className="study-btn"
                onClick={baseLineCharacterButtonHandle}
                type="button"
              >
                {baseLineButton ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={baseLineButton ? "study-data" : ""}>
              <Fade>
                <div className="d-subject">
                  <div className="container-width">
                    <label className="label-txt">Date of HCC Diagnosis</label>
                    <input
                      type="date"
                      // defaultValue={onlyData?.section3?.dateOfHcc}
                      value={dateOfHcc ? dateOfHcc : ""}
                      disabled={
                        role === "ROLE_REVIEWER" ||
                        role === "qa" ||
                        baseLineIfDateRadio === true
                      }
                      onChange={(e) => setDateOfHcc(e.target.value)}
                      className="input-width"
                    />
                    <label className="baseline-or2">or</label>
                    <input
                      id="baseline-ifdate"
                      // checked={baseLineIfDateRadio}
                      // defaultValue={onlyData?.section3?.}
                      defaultChecked={onlyData?.section3?.baseLineIfDateRadio}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      // value={"Date"}
                      onChange={() => {
                        if (!baseLineIfDateRadio) {
                          setDateOfHcc("");
                          // console.log("updated date of hcc");
                        }
                        setBaseLineIfDateRadio(!baseLineIfDateRadio);
                      }}
                      className="radio-date"
                      type="checkbox"
                    />
                    <label htmlFor="baseline-ifdate">
                      Date not <br />
                      Available
                    </label>
                  </div>
                  <div className="container-width">
                    <div className="d-subject"></div>
                    <label className="label-txt-baseLine">
                      If date not available, mention approximate year
                    </label>
                    <input
                      // disabled={baseLineIfDateRadio !== true}
                      min={1900}
                      max={2040}
                      value={baseLineIfDate}
                      disabled={
                        role === "ROLE_REVIEWER" ||
                        role === "qa" ||
                        baseLineIfDateRadio !== true
                      }
                      onChange={(e) => setBaseLineIfDate(e.target.value)}
                      className="input-width"
                      type="number"
                      placeholder="YYYY"
                    />
                  </div>
                </div>
                <div className="container-width">
                  <label className="label-txt">Age at HCC Diagnosis</label>
                  <input
                    placeholder="Enter the Age Between 1-100"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    defaultValue={onlyData?.section3?.baseLineAgeOfHcc || ""}
                    min={1}
                    max={100}
                    // value={baseLineAgeOfHcc}
                    onChange={(e) => setBaseLineAgeOfHcc(e.target.value)}
                    className="input-width"
                    type="number"
                  />
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label className="label-txt">Height</label>
                    <input
                      min={1}
                      max={1000}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      placeholder="Enter the Age"
                      defaultValue={onlyData?.section3?.baseLineHeight || ""}
                      // value={baseLineHeight}
                      onChange={(e) => setBaseLineHeight(e.target.value)}
                      className="input-width"
                      type="number"
                    />
                  </div>
                  <label>cm</label>
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label className="label-txt">
                      Weight <span>(Clostest to the date of HGG)</span>
                    </label>
                    <input
                      min={1}
                      max={1000}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      placeholder="Enter the Weight"
                      defaultValue={onlyData?.section3?.weightHggBaseLine || ""}
                      // value={weightHggBaseLine}
                      onChange={(e) => setWeightHggBaseLine(e.target.value)}
                      className="input-width"
                      type="number"
                    />
                  </div>
                  <label>kg</label>
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label className="label-txt">Body Mass Index(BMI)</label>
                    <input
                      min={1}
                      max={9999}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      placeholder="Enter the Body Mass Index"
                      defaultValue={onlyData?.section3?.bmiBaseLine || ""}
                      // value={bmiBaseLine}
                      onChange={(e) => setBmiBaseLine(e.target.value)}
                      className="input-width"
                      type="number"
                    />
                  </div>
                  <label>kg/m2</label>
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label className="label-txt">Type of Insurance</label>
                    <div>
                      <input
                        id="private"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        className="com-baseline"
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
                        name="baseline-insurance"
                        type="radio"
                      />
                      <label htmlFor="private">Private</label>

                      <input
                        id="public"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        className="com-baseline"
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
                        name="baseline-insurance"
                        type="radio"
                      />
                      <label htmlFor="public">Public</label>

                      <input
                        id="other"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        className="com-baseline"
                        checked={insuranceValue === "Other"}
                        value={"Other"}
                        onChange={(e) => setInsuranceValue(e.target.value)}
                        name="baseline-insurance"
                        type="radio"
                      />
                      <label htmlFor="other">Other</label>
                    </div>
                  </div>
                  <div className="container-width">
                    <textarea
                      // value={insuranceValueOther}
                      placeholder="Up to 15 Characters"
                      maxLength={15}
                      defaultValue={
                        onlyData?.section3?.insuraceValueOtherBaseline
                      }
                      onChange={(e) =>
                        setInsuranceValueOtherBaseline(e.target.value)
                      }
                      disabled={
                        insuranceValue !== "Other" ||
                        role === "ROLE_REVIEWER" ||
                        role === "qa"
                      }
                      className="input-width"
                    ></textarea>
                  </div>
                </div>

                <div className="container-width">
                  <label className="label-txt">Insurance Details</label>
                  <input
                    maxLength={30}
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    placeholder="Insurance Details"
                    defaultValue={
                      onlyData?.section3?.insuraceDetailsBaseLine || ""
                    }
                    // value={insuraceDetailsBaseLine}
                    onChange={(e) =>
                      setInsuranceDetailsBaseLine(e.target.value)
                    }
                    className="input-width"
                    type="text"
                  />
                </div>
              </Fade>
            </div>
          </div>
        </div>
        {/* Laboratory Parameters Most recent Container */}
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
                {laboratoryButton ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={laboratoryButton ? "study-data" : ""}>
              <Fade>
                <div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="alanine-lab" className="label-txt">
                        Alanine Aminotransferase(ALT)
                      </label>
                      <input
                        id="alanine-lab"
                        // value={alanineValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.alanineValue || ""}
                        onChange={(e) => setAlanineValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="alanine-from" className="label-to">
                        From
                      </label>
                      <input
                        id="alanine-from"
                        // value={alanineFrom}

                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.alanineFrom || ""}
                        onChange={(e) => setAlanineFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="alanine-to" className="label-to">
                        To
                      </label>
                      <input
                        id="alaninie-to"
                        // value={alanineTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.alanineTo || ""}
                        onChange={(e) => setAlanineTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">units/l</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="aspartate-lab" className="label-txt">
                        Aspartate Aminotransferase(AST)
                      </label>
                      <input
                        id="aspartate-lab"
                        // value={aspartateValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.aspartateValue || ""}
                        onChange={(e) => setAspartateValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="aspartate-from" className="label-to">
                        From
                      </label>
                      <input
                        id="aspartate-from"
                        // value={aspartateFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.aspartateFrom || ""}
                        onChange={(e) => setAspartateFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="aspartate-to" className="label-to">
                        To
                      </label>
                      <input
                        id="aspartate-to"
                        // value={aspartateTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.aspartateTo || ""}
                        onChange={(e) => setAspartateTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">units/l</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="total-bilirubin" className="label-txt">
                        Total Bilirubin
                      </label>
                      <input
                        id="total-bilirubin"
                        // value={bilirubinValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.bilirubinValue || ""}
                        onChange={(e) => setBilirubinValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label
                        htmlFor="total-bilirubin-from"
                        className="label-to"
                      >
                        From
                      </label>
                      <input
                        id="total-bilirubin-from"
                        // value={bilirubinFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.bilirubinFrom || ""}
                        onChange={(e) => setBilirubinFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="total-bilirubin-to" className="label-to">
                        To
                      </label>
                      <input
                        id="total-bilirubin-to"
                        // value={bilirubinTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.bilirubinTo || ""}
                        onChange={(e) => setBilirubinTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">mg/dl</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="alkaline-lab" className="label-txt">
                        Alkaline Phosphatase(ALP)
                      </label>
                      <input
                        id="alkaline-lab"
                        // value={alkalineValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.bilirubinTo || ""}
                        onChange={(e) => setAlkalineValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="alkaline-from" className="label-to">
                        From
                      </label>
                      <input
                        id="alkaline-from"
                        // value={alkalineFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.alanineFrom || ""}
                        onChange={(e) => setAlkalineFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="alkaline-to" className="label-to">
                        To
                      </label>
                      <input
                        id="alkaline-to"
                        // value={alkalineTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.alkalineTo || ""}
                        onChange={(e) => setAlkalineTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">units/l</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="albumin" className="label-txt">
                        Albumin
                      </label>
                      <input
                        id="albumin"
                        // value={albuminValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.albuminValue || ""}
                        onChange={(e) => setAlbuminValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="albumin-from" className="label-to">
                        From
                      </label>
                      <input
                        id="albumin-from"
                        // value={albuminFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.albuminFrom || ""}
                        onChange={(e) => setAlbuminFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="albumin-to" className="label-to">
                        To
                      </label>
                      <input
                        id="albumin-to"
                        // value={albuminTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.albuminTo || ""}
                        onChange={(e) => setAlbuminTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">g/dl</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="platelates-lab" className="label-txt">
                        Platelets
                      </label>
                      <input
                        id="platelates-lab"
                        // value={platelatesValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.platelatesValue || ""}
                        onChange={(e) => setPlatelatesValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="platelates-from" className="label-to">
                        From
                      </label>
                      <input
                        id="platelates-from"
                        // value={platelatesFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.platelatesFrom || ""}
                        onChange={(e) => setPlatelatesFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="platelates-to" className="label-to">
                        To
                      </label>
                      <input
                        id="platelates-to"
                        // value={platelatesTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.platelatesTo || ""}
                        onChange={(e) => setPlatelatesTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">k/μl (X 109 /μl)</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="creatinine-lab" className="label-txt">
                        Creatinine
                      </label>
                      <input
                        id="creatinine-lab"
                        // value={creatinineValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.creatinineValue || ""}
                        onChange={(e) => setCreatinineValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="creatinine-from" className="label-to">
                        From
                      </label>
                      <input
                        id="creatinine-from"
                        // value={creatinineFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.creatinineFrom || ""}
                        onChange={(e) => setCreatinineFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="creatinine-to" className="label-to">
                        To
                      </label>
                      <input
                        id="creatinine-to"
                        // value={creatinineTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.creatinineTo || ""}
                        onChange={(e) => setCreatinineTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">mg/dl</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="prothrombin-lab" className="label-txt">
                        Prothrombin Time(PT)
                      </label>
                      <input
                        id="prothrombin-lab"
                        // value={prothrombinValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={
                          onlyData?.section4?.prothrombinValue || ""
                        }
                        onChange={(e) => setProthrombinValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="prothrombin-from" className="label-to">
                        From
                      </label>
                      <input
                        id="prothrombin-from"
                        // value={prothrombinFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.prothrombinFrom || ""}
                        onChange={(e) => setProthrombinFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="prothrombin-to" className="label-to">
                        To
                      </label>
                      <input
                        id="prothrombin-to"
                        // value={prothrombinTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.prothrombinTo || ""}
                        onChange={(e) => setProthrombinTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">seconds</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="international-lab" className="label-txt">
                        International Normalized Ratio (INR)
                      </label>
                      <input
                        id="international-lab"
                        // value={internationalValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={
                          onlyData?.section4?.internationalValue || ""
                        }
                        onChange={(e) => setInternationalValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="internationalFrom" className="label-to">
                        From
                      </label>
                      <input
                        id="internationalFrom"
                        // value={internationalFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={
                          onlyData?.section4?.internationalFrom || ""
                        }
                        onChange={(e) => setInternationalFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="internationalTo" className="label-to">
                        To
                      </label>
                      <input
                        id="internationalTo"
                        // value={internationalTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.internationalTo || ""}
                        onChange={(e) => setinternationalTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">N/A</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="alpha-lab" className="label-txt">
                        Alpha-fetoprotein(AFP)
                      </label>
                      <input
                        id="alpha-lab"
                        // value={alphaValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.alphaValue || ""}
                        onChange={(e) => setAlphaValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="alpha-from" className="label-to">
                        From
                      </label>
                      <input
                        id="alpha-from"
                        // value={alphaFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.alphaFrom || ""}
                        onChange={(e) => setAlphaFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="alpha-to" className="label-to">
                        To
                      </label>
                      <input
                        id="alpha-to"
                        // value={alphaTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.alphaTo || ""}
                        onChange={(e) => setAlphaTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">ng/ml</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="sodium-lab" className="label-txt">
                        Sodium (Na)
                      </label>
                      <input
                        id="sodium-lab"
                        // value={sodiumValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.sodiumValue || ""}
                        onChange={(e) => setSodiumValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="sodium-from" className="label-to">
                        From
                      </label>
                      <input
                        id="sodium-from"
                        // value={sodiumFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.sodiumFrom || ""}
                        onChange={(e) => setSodiumFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="sodium-to" className="label-to">
                        To
                      </label>
                      <input
                        id="sodium-to"
                        // value={sodiumTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.sodiumTo || ""}
                        onChange={(e) => setSodiumTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">MmoI/L</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="blood-lab" className="label-txt">
                        Blood Urea Nitrogen
                      </label>
                      <input
                        id="blood-lab"
                        // value={bloodUreaValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.bloodUreaValue || ""}
                        onChange={(e) => setBloodUreaValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="blood-from" className="label-to">
                        From
                      </label>
                      <input
                        id="blood-from"
                        // value={bloodUreaFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.bloodUreaFrom || ""}
                        onChange={(e) => setBloodUreaFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="blood-to" className="label-to">
                        To
                      </label>
                      <input
                        id="blood-to"
                        // value={bloodUreaTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.bloodUreaTo || ""}
                        onChange={(e) => setBloodUreaTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">mg/dL</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="cholesterol-lab" className="label-txt">
                        Cholesterol
                      </label>
                      <input
                        id="cholesterol-lab"
                        // value={cholesterolValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={
                          onlyData?.section4?.cholesterolValue || ""
                        }
                        onChange={(e) => setCholesterolValue}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="cholesterol-from" className="label-to">
                        From
                      </label>
                      <input
                        id="cholesterol-from"
                        // value={cholesterolFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.cholesterolFrom || ""}
                        onChange={(e) => setCholesterolFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="cholesterol-to" className="label-to">
                        To
                      </label>
                      <input
                        id="cholesterol-to"
                        // value={cholesterolTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.cholesterolTo || ""}
                        onChange={(e) => setCholesterolTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">mg/dL</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="triglycerides-lab" className="label-txt">
                        Triglycerides
                      </label>
                      <input
                        id="triglycerides-lab"
                        // value={triglyceridesValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={
                          onlyData?.section4?.triglyceridesValue || ""
                        }
                        onChange={(e) => setTriglyceridesValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="triglycerides-from" className="label-to">
                        From
                      </label>
                      <input
                        id="triglycerides-from"
                        // value={triglyceridesFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={
                          onlyData?.section4?.triglyceridesFrom || ""
                        }
                        onChange={(e) => setTriglyceridesFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="triglycerides-to" className="label-to">
                        To
                      </label>
                      <input
                        id="triglycerides-to"
                        // value={triglyceridesTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.triglyceridesTo || ""}
                        onChange={(e) => setTriglyceridesTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">mg/dL</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="high-denisty-lab" className="label-txt">
                        High Density Lipo-proteins (HDL)
                      </label>
                      <input
                        id="high-denisty-lab"
                        // value={highDensityValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={
                          onlyData?.section4?.highDensityValue || ""
                        }
                        onChange={(e) => setHighDensityValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="high-denisty-from" className="label-to">
                        From
                      </label>
                      <input
                        id="high-denisty-from"
                        // value={highDenistyFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.highDenistyFrom || ""}
                        onChange={(e) => setHighDenistyFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="high-denisty-to" className="label-to">
                        To
                      </label>
                      <input
                        id="high-denisty-to"
                        // value={highDensityTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.highDensityTo || ""}
                        onChange={(e) => setHighDensityTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">mg/dL</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label htmlFor="low-density-lab" className="label-txt">
                        Low Density Lipo-proteins(LDL)
                      </label>
                      <input
                        id="low-density-lab"
                        // value={lowDensityValue}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.lowDensityValue || ""}
                        onChange={(e) => setLowDensityValue(e.target.value)}
                        type="number"
                        className="input-width"
                      />
                    </div>
                    <div className="container-width">
                      <label htmlFor="low-density-from" className="label-to">
                        From
                      </label>
                      <input
                        id="low-density-from"
                        // value={lowDensityFrom}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.lowDensityFrom || ""}
                        onChange={(e) => setLowDensityFrom(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label htmlFor="low-density-to" className="label-to">
                        To
                      </label>
                      <input
                        id="low-density-to"
                        // value={lowDensityTo}
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section4?.lowDensityTo || ""}
                        onChange={(e) => setLowDensityTo(e.target.value)}
                        type="number"
                        className="input-range"
                      />
                      <label className="label-units">mg/dL</label>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width-for-chronic">
                      <label className="label-txt">
                        Model for End Stage Liver Disease (MELD)
                      </label>
                      <div>
                        <input
                          id="model-end-applicable"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={modelEndStageLab === "Applicable"}
                          value={"Applicable"}
                          onChange={(e) => setModelEndStageLab(e.target.value)}
                          name="Model for End stage liver disease (MELD)"
                          className="chronicliver-ww"
                          type="radio"
                        />
                        <label htmlFor="model-end-applicable">Applicable</label>
                        <input
                          id="model-end-notapplicable"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={modelEndStageLab === "Not applicable"}
                          value={"Not applicable"}
                          onChange={(e) => setModelEndStageLab(e.target.value)}
                          name="Model for End stage liver disease (MELD)"
                          className="chronicliver-ww"
                          type="radio"
                        />
                        <label htmlFor="model-end-notapplicable">
                          Not applicable
                        </label>
                      </div>
                      {/* <input
                        id="model-end-ifapplicable"
                        checked={modelEndStageLab === "If applicable"}
                        value={"If applicable"}
                        onChange={(e) => setModelEndStageLab(e.target.value)}
                        name="Model for End stage liver disease (MELD)"
                        className="chronicliver-ww"
                        type="radio"
                      /> */}
                      <label
                        className="applicable"
                        htmlFor="model-end-ifapplicable"
                      >
                        If applicable
                      </label>
                    </div>
                    <div className="container-width">
                      <textarea
                        id="model-end-ifapplicable"
                        // value={modelEndStageTextArea}
                        defaultValue={
                          onlyData?.section4?.modelEndStageTextArea || ""
                        }
                        disabled={
                          modelEndStageLab !== "Applicable" ||
                          role === "ROLE_REVIEWER" ||
                          role === "qa"
                        }
                        onChange={(e) =>
                          setModelEndStageTextArea(e.target.value)
                        }
                        className="input-width"
                      ></textarea>
                    </div>
                  </div>
                  <div className="container-width">
                    <label htmlFor="meld-score-lab" className="label-txt">
                      MELD score
                    </label>
                    <input
                      id="meld-score-lab"
                      disabled={
                        modelEndStageLab !== "Applicable" ||
                        role === "ROLE_REVIEWER" ||
                        role === "qa"
                      }
                      // value={meldScoreLab}
                      defaultValue={onlyData?.section4?.meldScoreLab || ""}
                      onChange={(e) => setMeldScoreLab(e.target.value)}
                      className="input-width"
                    />
                  </div>
                  <div className="container-width">
                    <label htmlFor="FIB4-lab" className="label-txt">
                      FIB4
                    </label>
                    <input
                      id="FIB4-lab"
                      disabled={
                        modelEndStageLab !== "Applicable" ||
                        role === "ROLE_REVIEWER" ||
                        role === "qa"
                      }
                      // value={fib4Lab}
                      defaultValue={onlyData?.section4?.fib4Lab || ""}
                      onChange={(e) => setFIB4Lab(e.target.value)}
                      className="input-width"
                    />
                  </div>
                  <div className="container-width">
                    <label htmlFor="ast-platelet-lab" className="label-txt">
                      AST to Platelet Ratio Index (APRI)
                    </label>
                    <input
                      id="ast-platelet-lab"
                      disabled={
                        modelEndStageLab !== "Applicable" ||
                        role === "ROLE_REVIEWER" ||
                        role === "qa"
                      }
                      // value={astPlateletLab}
                      defaultValue={onlyData?.section4?.astPlateletLab || ""}
                      onChange={(e) => setastPlateletLab(e.target.value)}
                      className="input-width"
                    />
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
        {/*==============================Comorbidities container========================*/}

        <div>
          <div className="study-container">
            <div className="studyData-container">
              <h1 className="study-txt">Comorbidities</h1>
              <button
                type="button"
                onClick={comorbiditiesButtonHandle}
                className="study-btn"
              >
                {comorbiditiesButton ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={comorbiditiesButton ? "study-data" : ""}>
              <Fade>
                <div className="d-subject">
                  <div className="">
                    <h1 className="sub-section-txt">Disease/Disorder</h1>
                    <label className="label-txt">Diabetes</label>
                    <label className="label-txt">Hypertension</label>
                    <label className="label-txt">Dyslipidemia</label>
                    <label className="label-txt">Coronary Artery Disease</label>
                    <label className="label-txt">
                      Peripheral Vascular Disease
                    </label>
                    <label className="label-txt">HIV</label>
                    {/* <label className="label-txt">Non-liver cancer</label> */}
                  </div>

                  <div className="cc-road-containeryes">
                    <h1 className="sub-section-txt">Yes</h1>
                    <div className="cc-road">
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={diabetesComorbidities === "Yes"}
                          value={"Yes"}
                          onChange={(e) =>
                            setComorbiditiesDiabetes(e.target.value)
                          }
                          name="comorbidities-diabetes"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hypertensionComorbidities === "Yes"}
                          value={"Yes"}
                          onChange={(e) =>
                            setComorbiditiesHypertension(e.target.value)
                          }
                          name="comorbidities-hypertension"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={dyslipidemiaComorbidities === "Yes"}
                          value={"Yes"}
                          onChange={(e) =>
                            setComorbiditiesDyslipidemia(e.target.value)
                          }
                          name="comorbidities-dyslipidemia"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={coronaryComorbidities === "Yes"}
                          value={"Yes"}
                          onChange={(e) =>
                            setComorbiditiesCoronary(e.target.value)
                          }
                          name="comorbidities-coronary"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={peripheralComorbidities === "Yes"}
                          value={"Yes"}
                          onChange={(e) =>
                            setComorbiditiesPeripheral(e.target.value)
                          }
                          name="comorbidities-peripheral"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hivComorbidities === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setComorbiditiesHiv(e.target.value)}
                          name="comorbidities-hiv"
                          type="radio"
                        />
                      </div>
                      <div>
                        {/* <input name="comorbidities-non-liver" type="radio" /> */}
                      </div>
                    </div>
                  </div>
                  <div className="cc-road-containeryes">
                    <h1 className="sub-section-txt">No</h1>
                    <div className="cc-road">
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={diabetesComorbidities === "No"}
                          value={"No"}
                          onChange={(e) =>
                            setComorbiditiesDiabetes(e.target.value)
                          }
                          name="comorbidities-diabetes"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hypertensionComorbidities === "No"}
                          value={"No"}
                          onChange={(e) =>
                            setComorbiditiesHypertension(e.target.value)
                          }
                          name="comorbidities-hypertension"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={dyslipidemiaComorbidities === "No"}
                          value={"No"}
                          onChange={(e) =>
                            setComorbiditiesDyslipidemia(e.target.value)
                          }
                          name="comorbidities-dyslipidemia"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={coronaryComorbidities === "No"}
                          value={"No"}
                          onChange={(e) =>
                            setComorbiditiesCoronary(e.target.value)
                          }
                          name="comorbidities-coronary"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={peripheralComorbidities === "No"}
                          value={"No"}
                          onChange={(e) =>
                            setComorbiditiesPeripheral(e.target.value)
                          }
                          name="comorbidities-peripheral"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hivComorbidities === "No"}
                          value={"No"}
                          onChange={(e) => setComorbiditiesHiv(e.target.value)}
                          name="comorbidities-hiv"
                          type="radio"
                        />
                      </div>
                      <div>
                        {/* <input name="comorbidities-non-liver" type="radio" /> */}
                      </div>
                    </div>
                  </div>
                  <div className="cc-road-containeryes">
                    <h1 className="sub-section-txt">Unknown</h1>
                    <div className="cc-road">
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={diabetesComorbidities === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) =>
                            setComorbiditiesDiabetes(e.target.value)
                          }
                          name="comorbidities-diabetes"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hypertensionComorbidities === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) =>
                            setComorbiditiesHypertension(e.target.value)
                          }
                          name="comorbidities-hypertension"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={dyslipidemiaComorbidities === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) =>
                            setComorbiditiesDyslipidemia(e.target.value)
                          }
                          name="comorbidities-dyslipidemia"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={coronaryComorbidities === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) =>
                            setComorbiditiesCoronary(e.target.value)
                          }
                          name="comorbidities-coronary"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={peripheralComorbidities === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) =>
                            setComorbiditiesPeripheral(e.target.value)
                          }
                          name="comorbidities-peripheral"
                          type="radio"
                        />
                      </div>
                      <div>
                        <input
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hivComorbidities === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => setComorbiditiesHiv(e.target.value)}
                          name="comorbidities-hiv"
                          type="radio"
                        />
                      </div>
                      <div>
                        {/* <input name="comorbidities-non-liver" type="radio" /> */}
                      </div>
                    </div>
                  </div>
                  <div className="cc-road-container">
                    <h1 className="sub-section-txt">If Yes,</h1>
                    <div className="cc-road">
                      <div>
                        <label>Prior to</label>
                        <input
                          name="diabetes-ifyes"
                          disabled={
                            diabetesComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={diabetesAfter === "After"}
                          value={"After"}
                          onChange={(e) => setDiabetesAfter(e.target.value)}
                          type="radio"
                        />
                        <label>After</label>
                        <input
                          name="diabetes-ifyes"
                          disabled={
                            diabetesComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={diabetesAfter === "NAV"}
                          value={"NAV"}
                          onChange={(e) => setDiabetesAfter(e.target.value)}
                          type="radio"
                        />
                        <label>Nav</label>
                      </div>
                      <div>
                        <label>Prior to</label>
                        <input
                          name="hypertension-ifyes"
                          disabled={
                            hypertensionComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={hypertensionAfter === "After"}
                          onChange={(e) => setHypertensionAfter(e.target.value)}
                          value={"After"}
                          type="radio"
                        />
                        <label>After</label>
                        <input
                          name="hypertension-ifyes"
                          disabled={
                            hypertensionComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={hypertensionAfter === "NAV"}
                          onChange={(e) => setHypertensionAfter(e.target.value)}
                          value={"NAV"}
                          type="radio"
                        />
                        <label>Nav</label>
                      </div>
                      <div>
                        <label>Prior to</label>
                        <input
                          name="dyslipidemia-ifyes"
                          disabled={
                            dyslipidemiaComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={dysliAfter === "After"}
                          onChange={(e) => setDyslipidemiaAfter(e.target.value)}
                          value={"After"}
                          type="radio"
                        />
                        <label>After</label>
                        <input
                          name="dyslipidemia-ifyes"
                          disabled={
                            dyslipidemiaComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={dysliAfter === "NAV"}
                          onChange={(e) => setDyslipidemiaAfter(e.target.value)}
                          value={"NAV"}
                          type="radio"
                        />
                        <label>Nav</label>
                      </div>
                      <div>
                        <label>Prior to</label>
                        <input
                          name="coronary-ifyes"
                          disabled={
                            coronaryComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={coronaryAfter === "After"}
                          onChange={(e) => setCoronaryAfter(e.target.value)}
                          value={"After"}
                          type="radio"
                        />
                        <label>After</label>
                        <input
                          name="coronary-ifyes"
                          disabled={
                            coronaryComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={coronaryAfter === "NAV"}
                          onChange={(e) => setCoronaryAfter(e.target.value)}
                          value={"NAV"}
                          type="radio"
                        />
                        <label>Nav</label>
                      </div>
                      <div>
                        <label>Prior to</label>
                        <input
                          name="peripheral-ifyes"
                          disabled={
                            peripheralComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={peripheralAfter === "After"}
                          onChange={(e) => setPeripheralAfter(e.target.value)}
                          value={"After"}
                          type="radio"
                        />
                        <label>After</label>
                        <input
                          name="peripheral-ifyes"
                          disabled={
                            peripheralComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={peripheralAfter === "NAV"}
                          onChange={(e) => setPeripheralAfter(e.target.value)}
                          value={"NAV"}
                          type="radio"
                        />
                        <label>Nav</label>
                      </div>
                      <div>
                        <label>Prior to</label>
                        <input
                          name="hivcomorbidiites-ifyes"
                          disabled={
                            hivComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          checked={hivAfter === "After"}
                          onChange={(e) => setHIVAfter(e.target.value)}
                          value={"After"}
                          type="radio"
                        />
                        <label>After</label>
                        <input
                          name="hivcomorbidiites-ifyes"
                          checked={hivAfter === "NAV"}
                          onChange={(e) => setHIVAfter(e.target.value)}
                          disabled={
                            hivComorbidities !== "Yes" ||
                            role === "ROLE_REVIEWER" ||
                            role === "qa"
                          }
                          value={"NAV"}
                          type="radio"
                        />
                        <label>Nav</label>
                      </div>
                      {/* <div>
                        <label>Prior to</label>
                        <input type="radio" />
                        <label>After</label>
                        <input type="radio" />
                        <label>Nav</label>
                      </div> */}
                    </div>
                  </div>
                  <div className="">
                    <h1 className="sub-section-txt">If Yes, No of years</h1>
                    <div>
                      <div className="cc-road">
                        <div>
                          <input
                            // disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            defaultValue={
                              onlyData?.section5?.yesDiabetesInput || ""
                            }
                            onChange={(e) =>
                              setYesDiabetesInput(e.target.value)
                            }
                            disabled={
                              diabetesComorbidities !== "Yes" ||
                              role === "ROLE_REVIEWER" ||
                              role === "qa"
                            }
                            type="text"
                          />
                        </div>
                        <div>
                          <input
                            // disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            defaultValue={
                              onlyData?.section5?.yesHyperTensionInput || ""
                            }
                            onChange={(e) =>
                              setYesHyperTensionInput(e.target.value)
                            }
                            disabled={
                              hypertensionComorbidities !== "Yes" ||
                              role === "ROLE_REVIEWER" ||
                              role === "qa"
                            }
                            type="text"
                          />
                        </div>
                        <div>
                          <input
                            // disabled={role === "ROLE_REVIEWER" || role === "qa" }
                            defaultValue={
                              onlyData?.section5?.yesDyslipidemiaInput || ""
                            }
                            onChange={(e) =>
                              setYesDyslipidemiaInput(e.target.value)
                            }
                            disabled={
                              dyslipidemiaComorbidities !== "Yes" ||
                              role === "ROLE_REVIEWER" ||
                              role === "qa"
                            }
                            type="text"
                          />
                        </div>
                        <div>
                          <input
                            // disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            defaultValue={
                              onlyData?.section5?.yesCoronaryInput || ""
                            }
                            onChange={(e) =>
                              setYesCoronaryInput(e.target.value)
                            }
                            disabled={
                              coronaryComorbidities !== "Yes" ||
                              role === "ROLE_REVIEWER" ||
                              role === "qa"
                            }
                            type="text"
                          />
                        </div>
                        <div>
                          <input
                            // disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            defaultValue={
                              onlyData?.section5?.yesPeripheralInput || ""
                            }
                            onChange={(e) =>
                              setYesPeripheralInput(e.target.value)
                            }
                            disabled={
                              peripheralComorbidities !== "Yes" ||
                              role === "ROLE_REVIEWER" ||
                              role === "qa"
                            }
                            type="text"
                          />
                        </div>
                        <div>
                          <input
                            defaultValue={onlyData?.section5?.yesHivInput || ""}
                            onChange={(e) => setYesHivInput(e.target.value)}
                            disabled={
                              hivComorbidities !== "Yes" ||
                              role === "ROLE_REVIEWER" ||
                              role === "qa"
                            }
                            type="text"
                          />
                        </div>
                        {/* <div>
                          <input type="text" />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-width">
                  <label className="label-txt">Non-liver cancer</label>
                  <input
                    // disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    defaultChecked={onlyData?.section5?.isChecked}
                    // checked={onlyData?.section5?.isChecked}
                    type="checkbox"
                    onChange={() => {
                      // // const s = e.target.value;
                      // if (isChecked) {
                      //   setYesLocationSiteValue("");
                      //   setYesStageValue("");
                      //   setYesYearOfdiagnosis("");
                      // }
                      setIsChecked(!isChecked);
                    }}
                  />
                  {// console.log(isChecked, onlyData?.section5?.isChecked)}
                </div>
                <div className="container-width">
                  <label htmlFor="if-yes-location" className="label-txt">
                    If Yes, Location/site
                  </label>
                  <input
                    id="if-yes-location"
                    // value={yesLocationSiteValue}
                    defaultValue={onlyData?.section5?.yesLocationSiteValue}
                    disabled={
                      role === "ROLE_REVIEWER" || role === "qa" || isChecked !== true
                    }
                    maxLength={20}
                    onChange={(e) => setYesLocationSiteValue(e.target.value)}
                    type="text"
                    className="input-width"
                  />
                </div>
                <div className="container-width">
                  <label htmlFor="if-yes-stage" className="label-txt">
                    If Yes, Stage
                  </label>
                  <input
                    min={10}
                    max={99}
                    id="if-yes-stage"
                    // value={yesStageValue}
                    defaultValue={onlyData?.section5?.yesStageValue}
                    disabled={
                      role === "ROLE_REVIEWER" || role === "qa" || isChecked !== true
                    }
                    onChange={(e) => setYesStageValue(e.target.value)}
                    type="number"
                    className="input-width"
                  />
                </div>
                <div className="container-widthd-comorbidities">
                  <label htmlFor="if-yes-diagnosis" className="label-txt">
                    If Yes, Year of Diagnosis
                  </label>
                  <div className="container-widthd">
                    <input
                      disabled={
                        role === "ROLE_REVIEWER" ||
                        role === "qa" ||
                        isChecked !== true
                      }
                      id="if-yes-diagnosis"
                      // value={yesYearOfDiagnosis}
                      defaultValue={onlyData?.section5?.yesYearOfDiagnosis}
                      onChange={(e) => {
                        setYesYearOfdiagnosis(e.target.value);
                      }}
                      type="number"
                      placeholder="YYYY"
                      className="input-width"
                    />
                  </div>
                </div>
                <div className="container-width-for-chronic">
                  <label className="label-txt">
                    Alcohol Consumption / Abuse
                  </label>
                  <div className="chronic-mittal">
                    <div>
                      <input
                        className="gap"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        id="alcohol-consumption-no"
                        checked={alcoholConsumptionValue === "No"}
                        value={"No"}
                        onChange={(e) =>
                          setAlcoholConsumptionValue(e.target.value)
                        }
                        name="Alcohol Consumption"
                        type="radio"
                      />
                      <label htmlFor="alcohol-consumption-no">No</label>
                    </div>
                    <div>
                      <input
                        className="gap"
                        id="alcohol-consumption-yes"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                        className="gap"
                        id="alcohol-consumption-history"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          alcoholConsumptionValue ===
                          "history of more than 3 drinks per day for men or more than 2 drinks per day for women"
                        }
                        value={
                          "history of more than 3 drinks per day for men or more than 2 drinks per day for women"
                        }
                        onChange={(e) =>
                          setAlcoholConsumptionValue(e.target.value)
                        }
                        name="Alcohol Consumption"
                        type="radio"
                      />
                      <label htmlFor="alcohol-consumption-history">
                        History of more than 3 drinks per day for men or more
                        than 2 drinks per day for women
                      </label>
                    </div>
                    <div>
                      <input
                        className="gap"
                        id="alcohol-consumption-document"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          alcoholConsumptionValue ===
                          "documentation of alcoholistm/alcoholic abuse in progress notes"
                        }
                        value={
                          "documentation of alcoholistm/alcoholic abuse in progress notes"
                        }
                        onChange={(e) =>
                          setAlcoholConsumptionValue(e.target.value)
                        }
                        name="Alcohol Consumption"
                        type="radio"
                      />
                      <label htmlFor="alcohol-consumption-document">
                        Documentation of alcoholistm/alcoholic abuse in progress
                        notes
                      </label>
                    </div>
                    <div>
                      <input
                        className="gap"
                        id="alcohol-consumption-enrollment"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          alcoholConsumptionValue ===
                          "enrollment in rehabilitation"
                        }
                        value={"enrollment in rehabilitation"}
                        onChange={(e) =>
                          setAlcoholConsumptionValue(e.target.value)
                        }
                        name="Alcohol Consumption"
                        type="radio"
                      />
                      <label htmlFor="alcohol-consumption-enrollment">
                        Enrollment in rehabilitation
                      </label>
                    </div>
                    <div>
                      <input
                        className="gap"
                        id="alcohol-consumption-history-of"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          alcoholConsumptionValue ===
                          "history of alcoholic hepatitis"
                        }
                        value={"history of alcoholic hepatitis"}
                        onChange={(e) =>
                          setAlcoholConsumptionValue(e.target.value)
                        }
                        name="Alcohol Consumption"
                        type="radio"
                      />
                      <label htmlFor="alcohol-consumption-history-of">
                        History of alcoholic hepatitis
                      </label>
                    </div>
                    <div>
                      <input
                        className="gap"
                        id="alcohol-consumption-unknown"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={alcoholConsumptionValue === "Unknown"}
                        value={"Unknown"}
                        onChange={(e) =>
                          setAlcoholConsumptionValue(e.target.value)
                        }
                        name="Alcohol Consumption"
                        type="radio"
                      />
                      <label htmlFor="alcohol-consumption-unknown">
                        Unknown
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="sub-section-txt">HCC diagnosis Information</h1>

                  <div className="container-width-for-chronic">
                    <label className="label-txt">Method of Diagnosis</label>
                    <div className="chronic-mittal">
                      <div>
                        <input
                          className="gap"
                          id="diagnosis-information-bio"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={
                            diagnosisInformationValue ===
                            "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)"
                          }
                          value={
                            "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)"
                          }
                          onChange={(e) => {
                            const s = e.target.value;
                            if (s === "Other(specify)") {
                              sethccDiagnosisInfo("");
                            } else {
                              sethccDiagnosisInfo("");
                            }
                            setDiagnosisInformationValue(s);
                          }}
                          name="diagnosis-information"
                          type="radio"
                        />
                        <label htmlFor="diagnosis-information-bio">
                          Biopsy(any tissue diagnosis including(fine needle
                          aspiration) FNA)
                        </label>
                        <input
                          className="gap-label gap"
                          id="diagnosis-information-other"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={
                            diagnosisInformationValue === "Other(specify)"
                          }
                          value={"Other(specify)"}
                          onChange={(e) =>
                            setDiagnosisInformationValue(e.target.value)
                          }
                          name="diagnosis-information"
                          type="radio"
                        />
                        <label htmlFor="diagnosis-information-other">
                          Other(specify)
                        </label>
                        <input
                          className="gap"
                          disabled={
                            diagnosisInformationValue !== "Other(specify)"
                          }
                          defaultValue={
                            onlyData?.section5
                              ?.hccDiagnosisInfoValueOtherSpecify || ""
                          }
                          onChange={(e) => sethccDiagnosisInfo(e.target.value)}
                          type="text"
                        />
                      </div>
                      <div>
                        <input
                          className="gap"
                          id="diagnosis-imaging"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={diagnosisInformationValue === "Imaging"}
                          value={"Imaging"}
                          onChange={(e) => {
                            const s = e.target.value;
                            if (s === "Other(specify)") {
                              sethccDiagnosisInfo("");
                            } else {
                              sethccDiagnosisInfo("");
                            }
                            setDiagnosisInformationValue(s);
                          }}
                          name="diagnosis-information"
                          type="radio"
                        />
                        <label htmlFor="diagnosis-imaging">Imaging</label>
                        <input
                          className="gap"
                          id="diagnosis-unknown"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={diagnosisInformationValue === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => {
                            const s = e.target.value;
                            if (s === "Other(specify)") {
                              sethccDiagnosisInfo("");
                            } else {
                              sethccDiagnosisInfo("");
                            }
                            setDiagnosisInformationValue(s);
                          }}
                          name="diagnosis-information"
                          type="radio"
                        />
                        <label htmlFor="diagnosis-unknown">Unknown</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="sub-section-txt">HCC Staging</h1>
                  <div className="container-width">
                    <label htmlFor="large-turmor-size" className="label-txt">
                      Largest Tumor Size/Diameter(if multiple nodules, incluce )
                    </label>
                    <input
                      id="large-turmor-size"
                      // value={largeTurmorValue}
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      defaultValue={onlyData?.section5?.largeTurmorValue || ""}
                      onChange={(e) => setLargeTurmorValue(e.target.value)}
                      className="input-width"
                      type="text"
                    />
                  </div>
                  <div className="container-widthd-comorbidities">
                    <label className="label-txt">
                      T(Primary Tumor)(as per Current TNM HCC classfication)
                    </label>
                    <div className="">
                      <input
                        className="gap"
                        id="t-primary-tx"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={tPrimaryValue === "TX"}
                        value={"TX"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-tx">TX</label>
                      <input
                        className="gap"
                        id="t-primary-t0"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={tPrimaryValue === "T0"}
                        value={"T0"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t0">T0</label>
                      <input
                        className="gap"
                        id="t-primary-t1"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={tPrimaryValue === "T1"}
                        value={"T1"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t1">T1</label>
                      <input
                        className="gap"
                        id="t-primary-t2"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={tPrimaryValue === "T2"}
                        value={"T2"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t2">T2</label>
                      <input
                        className="gap"
                        id="t-primary-t3a"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={tPrimaryValue === "T3a"}
                        value={"T3a"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t3a">T3a</label>
                      <input
                        className="gap"
                        id="t-primary-t3b"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={tPrimaryValue === "T3b"}
                        value={"T3b"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t3b">T3b</label>
                      <input
                        className="gap"
                        id="t-primary-t4"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={tPrimaryValue === "T4"}
                        value={"T4"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t4">T4</label>
                    </div>
                  </div>
                  <div className="container-width">
                    <label className="label-txt">
                      N(Regional Lymph Nodes)(as per Current TNM HCC
                      Classfication)
                    </label>
                    <div>
                      <input
                        className="gap"
                        id="n-regional-nx"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={nRegionalValue === "NX"}
                        value={"NX"}
                        onChange={(e) => setNRegionalValue(e.target.value)}
                        name="n-regional-lymph"
                        type="radio"
                      />
                      <label htmlFor="n-regional-nx">NX</label>
                      <input
                        className="gap"
                        id="n-regional-n0"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={nRegionalValue === "N0"}
                        value={"N0"}
                        onChange={(e) => setNRegionalValue(e.target.value)}
                        name="n-regional-lymph"
                        type="radio"
                      />
                      <label htmlFor="n-regional-n0">N0</label>
                      <input
                        className="gap"
                        id="n-regional-n1"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={nRegionalValue === "N1"}
                        value={"N1"}
                        onChange={(e) => setNRegionalValue(e.target.value)}
                        name="n-regional-lymph"
                        type="radio"
                      />
                      <label htmlFor="n-regional-n1">N1</label>
                    </div>
                  </div>
                  <div className="container-width">
                    <label className="label-txt">
                      M(Distant Metastasis)(as per Current TNM HCC
                      Classfication)
                    </label>
                    <div>
                      <input
                        id="n-regional-mx"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={mRegionalValue === "MX"}
                        value={"MX"}
                        name="n-regional-metastasis"
                        onChange={(e) => setMRegionalValue(e.target.value)}
                        type="radio"
                      />
                      <label htmlFor="n-regional-mx">MX</label>
                      <input
                        className="gap"
                        id="n-regional-m0"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={mRegionalValue === "M0"}
                        value={"M0"}
                        onChange={(e) => setMRegionalValue(e.target.value)}
                        name="n-regional-metastasis"
                        type="radio"
                      />
                      <label htmlFor="n-regional-m0">M0</label>
                      <input
                        className="gap"
                        id="n-regional-m1"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                    <div className="">
                      <label className="label-txt">
                        Anatomic Stage(as per Current TNM HCC Classfication)
                      </label>
                    </div>
                    <div className="">
                      <div className="d-subject">
                        <div className="chronic-mittal">
                          <div>
                            <input
                              className="gap"
                              id="anatomic-stage1"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={anatomicStageTNM === "Stage I(T1 N0 M0)"}
                              value={"Stage I(T1 N0 M0)"}
                              onChange={(e) =>
                                setAnatomicStageTNM(e.target.value)
                              }
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage1">
                              Stage I(T1 N0 M0)
                            </label>
                          </div>
                          <div>
                            <input
                              className="gap"
                              id="anatomic-stage3b"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={
                                anatomicStageTNM === "Stage IIIB(T3b N0 M0)"
                              }
                              value={"Stage IIIB(T3b N0 M0)"}
                              onChange={(e) =>
                                setAnatomicStageTNM(e.target.value)
                              }
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage3b">
                              Stage IIIB(T3b N0 M0)
                            </label>
                          </div>
                          <div>
                            <input
                              className="gap"
                              id="anatomic-stage4b"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={
                                anatomicStageTNM === "Stage IVB(Any T Any N M1)"
                              }
                              value={"Stage IVB(Any T Any N M1)"}
                              onChange={(e) =>
                                setAnatomicStageTNM(e.target.value)
                              }
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
                              className="gap"
                              id="anatomic-stage2"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={
                                anatomicStageTNM === "Stage II(T2 N0 M0)"
                              }
                              value={"Stage II(T2 N0 M0)"}
                              onChange={(e) =>
                                setAnatomicStageTNM(e.target.value)
                              }
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage2">
                              Stage II(T2 N0 M0)
                            </label>
                          </div>
                          <div>
                            <input
                              className="gap"
                              id="anatomic-stage3c"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={
                                anatomicStageTNM === "Stage IIIC(T4 N0 M0)"
                              }
                              value={"Stage IIIC(T4 N0 M0)"}
                              onChange={(e) =>
                                setAnatomicStageTNM(e.target.value)
                              }
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage3c">
                              Stage IIIC(T4 N0 M0)
                            </label>
                          </div>
                          <div>
                            <input
                              className="gap"
                              id="anatomic-stagenav"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={
                                anatomicStageTNM === "NAV/Cannot be staged"
                              }
                              value={"NAV/Cannot be staged"}
                              onChange={(e) =>
                                setAnatomicStageTNM(e.target.value)
                              }
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
                              className="gap"
                              id="anatomic-stage3a"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={
                                anatomicStageTNM === "Stage IIIA(T3a N0 M0)"
                              }
                              value={"Stage IIIA(T3a N0 M0)"}
                              onChange={(e) =>
                                setAnatomicStageTNM(e.target.value)
                              }
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage3a">
                              Stage IIIA(T3a N0 M0)
                            </label>
                          </div>
                          <div>
                            <input
                              className="gap"
                              id="anatomic-stage4a"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={
                                anatomicStageTNM === "Stage IVA(Any T N1 M0)"
                              }
                              value={"Stage IVA(Any T N1 M0)"}
                              onChange={(e) =>
                                setAnatomicStageTNM(e.target.value)
                              }
                              name="anatomic-stage"
                              type="radio"
                            />
                            <label htmlFor="anatomic-stage4a">
                              Stage IVA(Any T N1 M0)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <label className="label-txt">Tumor Differentiation</label>
                    <div className="">
                      <input
                        className="gap"
                        id="tumor-differentiation-well"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={tumorDiffValue === "Well"}
                        value={"Well"}
                        onChange={(e) => setTumorDiffValue(e.target.value)}
                        name="tumor-differentiation"
                        type="radio"
                      />
                      <label htmlFor="tumor-differentiation-well">Well</label>
                      <input
                        className="gap"
                        id="tumor-differentiation-moderate"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                        className="gap"
                        id="tumor-differentiation-poor"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={tumorDiffValue === "Poor"}
                        value={"Poor"}
                        onChange={(e) => setTumorDiffValue(e.target.value)}
                        name="tumor-differentiation"
                        type="radio"
                      />
                      <label htmlFor="tumor-differentiation-poor">Poor</label>
                      <input
                        className="gap"
                        id="tumor-differentiation-nav"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={tumorDiffValue === "Nav"}
                        value={"Nav"}
                        onChange={(e) => setTumorDiffValue(e.target.value)}
                        name="tumor-differentiation"
                        type="radio"
                      />
                      <label htmlFor="tumor-differentiation-nav">Nav</label>
                      <input
                        className="gap"
                        id="tumor-differentiation-anaplastic"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          tumorDiffValue === "Undifferentiated/anaplastic"
                        }
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
                  <div className="d-subject">
                    <label className="label-txt">
                      ECOG Performance Score(or Karnofsky Equivalent )
                    </label>
                    <div className="">
                      <div className="d-subject">
                        <div className="chronic-mittal">
                          <div>
                            <input
                              className="gap"
                              id="ecog-performance0"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={ecogperformace === "0 (KPS 90 or 100)"}
                              value={"0 (KPS 90 or 100)"}
                              onChange={(e) =>
                                setEcogPerformace(e.target.value)
                              }
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance0">
                              0 (KPS 90 or 100)
                            </label>
                          </div>
                          <div>
                            <input
                              className="gap"
                              id="ecog-performance3"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={ecogperformace === "3 (KPS 30 or 40)"}
                              value={"3 (KPS 30 or 40)"}
                              onChange={(e) =>
                                setEcogPerformace(e.target.value)
                              }
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
                              className="gap"
                              id="ecog-performance1-70"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={ecogperformace === "1 (KPS 70 or 80)"}
                              value={"1 (KPS 70 or 80)"}
                              onChange={(e) =>
                                setEcogPerformace(e.target.value)
                              }
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance1-70">
                              1 (KPS 70 or 80)
                            </label>
                          </div>
                          <div>
                            <input
                              className="gap"
                              id="ecog-performance-4-20"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={ecogperformace === "4 (KPS 10 or 20)"}
                              value={"4 (KPS 10 or 20)"}
                              onChange={(e) =>
                                setEcogPerformace(e.target.value)
                              }
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
                              className="gap"
                              id="ecog-performance-2-50"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={ecogperformace === "2 (KPS 50 or 60)"}
                              value={"2 (KPS 50 or 60)"}
                              onChange={(e) =>
                                setEcogPerformace(e.target.value)
                              }
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance-2-50">
                              2 (KPS 50 or 60)
                            </label>
                          </div>
                          <div>
                            <input
                              className="gap"
                              id="ecog-performance-3-dead"
                              disabled={role === "ROLE_REVIEWER" || role === "qa"}
                              checked={ecogperformace === "5 (KPS 0 = dead)"}
                              value={"5 (KPS 0 = dead)"}
                              onChange={(e) =>
                                setEcogPerformace(e.target.value)
                              }
                              name="ecog-performace"
                              type="radio"
                            />
                            <label htmlFor="ecog-performance-3-dead">
                              5 (KPS 0 = dead)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="d-subject paddingg">
                      <label className="label-txt">Tumor Stage</label>
                      <div className="">
                        <div className="d-subject">
                          <div className="chronic-mittal">
                            <div className="tumor-stage">
                              <input
                                className="gap"
                                id="tumor-stage-single"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  tumorStageValue ===
                                  "single(with or without microvascular invasion)"
                                }
                                value={
                                  "single(with or without microvascular invasion)"
                                }
                                onChange={(e) =>
                                  setTumorStageValue(e.target.value)
                                }
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
                                className="gap"
                                id="tumor-stage-3tumors"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  tumorStageValue ===
                                  "3 tumors 3cm (≤ 3 tumors and none is > 3 cm with or without microvascular invasion)"
                                }
                                value={
                                  "3 tumors 3cm (≤ 3 tumors and none is > 3 cm with or without microvascular invasion)"
                                }
                                onChange={(e) =>
                                  setTumorStageValue(e.target.value)
                                }
                                name="tumor-stage"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="tumor-stage-3tumors"
                              >
                                3 tumors 3cm (≤ 3 tumors and none is > 3 cm with
                                or without microvascular invasion)
                              </label>
                            </div>
                            <div className="tumor-stage">
                              <input
                                className="gap"
                                id="tumor-stage-large"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  tumorStageValue ===
                                  "Large multinodular(> 3 tumors ≥2 tumors any larger than 3 cm with or without microvascular invasion )"
                                }
                                value={
                                  "Large multinodular(> 3 tumors ≥2 tumors any larger than 3 cm with or without microvascular invasion )"
                                }
                                onChange={(e) =>
                                  setTumorStageValue(e.target.value)
                                }
                                name="tumor-stage"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="tumor-stage-large"
                              >
                                Large multinodular(> 3 tumors ≥2 tumors any
                                larger than 3 cm with or without microvascular
                                invasion )
                              </label>
                            </div>
                            <div className="tumor-stage">
                              <input
                                className="gap"
                                id="tumor-stage-vascular"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  tumorStageValue ===
                                  "Vascular invasion or extrahepatic spread (only macrovascular invasion of great vessels or mets)"
                                }
                                value={
                                  "Vascular invasion or extrahepatic spread (only macrovascular invasion of great vessels or mets)"
                                }
                                onChange={(e) =>
                                  setTumorStageValue(e.target.value)
                                }
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
                            <div className="container-width-for-chronic">
                              <input
                                className="gap"
                                id="tumor-stage-any"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={tumorStageValue === "Any"}
                                value={"Any"}
                                onChange={(e) =>
                                  setTumorStageValue(e.target.value)
                                }
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <div className="d-subject">
                      <label className="label-txt">
                        Type of Vascular Invasion/Extrahepatic Spread
                      </label>
                      <div className="">
                        <div className="d-subject">
                          <div className="chronic-mittal">
                            <div className="tumor-stage">
                              <input
                                className="gap"
                                id="vascular-invasion-macro"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  typeOfVascular ===
                                  "Macrovascular invasion: radiographic and vascular invasion based on large"
                                }
                                value={
                                  "Macrovascular invasion: radiographic and vascular invasion based on large"
                                }
                                onChange={(e) =>
                                  setTypeOfVascular(e.target.value)
                                }
                                name="type-of-vascular-invasion"
                                type="radio"
                              />
                              <label
                                className="label-gap-tumor-stage"
                                htmlFor="vascular-invasion-macro"
                              >
                                Macrovascular invasion: radiographic and
                                vascular invasion based on large
                              </label>
                            </div>
                            <div className="tumor-stage">
                              <input
                                className="gap"
                                id="vascular-invasion-vessel"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  typeOfVascular ===
                                  "Vessel disease seen on imaging at the time of diagnosis.(Outside Milan)"
                                }
                                value={
                                  "Vessel disease seen on imaging at the time of diagnosis.(Outside Milan)"
                                }
                                onChange={(e) =>
                                  setTypeOfVascular(e.target.value)
                                }
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
                                className="gap"
                                id="vascular-invasion-extrahepatic"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  typeOfVascular ===
                                  "Extrahepatic spread(outside Milan)"
                                }
                                value={"Extrahepatic spread(outside Milan)"}
                                onChange={(e) =>
                                  setTypeOfVascular(e.target.value)
                                }
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
                    <label className="label-txt">
                      Is Microvascular Invasion Present on Histology
                    </label>
                    <div className="chronic-mittal">
                      <div>
                        <input
                          className="gap"
                          id="mircovascular-invasion-yes"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={microvascularInvasion === "Yes"}
                          value={"Yes"}
                          onChange={(e) =>
                            setMicrovascularInvasion(e.target.value)
                          }
                          name="microvascular-invasion-histology"
                          type="radio"
                        />
                        <label htmlFor="mircovascular-invasion-yes">Yes</label>
                        <input
                          className="gap"
                          id="mircovascular-invasion-no"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={microvascularInvasion === "No"}
                          value={"No"}
                          onChange={(e) =>
                            setMicrovascularInvasion(e.target.value)
                          }
                          name="microvascular-invasion-histology"
                          type="radio"
                        />
                        <label htmlFor="mircovascular-invasion-no">No</label>

                        <input
                          className="gap"
                          id="mircovascular-invasion-not-enough"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={
                            microvascularInvasion ===
                            "Not enough information from histology"
                          }
                          value={"Not enough information from histology"}
                          onChange={(e) =>
                            setMicrovascularInvasion(e.target.value)
                          }
                          name="microvascular-invasion-histology"
                          type="radio"
                        />
                        <label htmlFor="mircovascular-invasion-not-enough">
                          Not enough information from histology
                        </label>
                        <input
                          className="gap"
                          id="mircovascular-invasion-histology"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={
                            microvascularInvasion ===
                            "Histology is not available"
                          }
                          value={"Histology is not available"}
                          onChange={(e) =>
                            setMicrovascularInvasion(e.target.value)
                          }
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
                    <div className="d-subject">
                      <label className="label-txt">
                        Tumor Within Milan Criteria
                      </label>
                      <div className="">
                        <div className="d-subject">
                          <div className="chronic-mittal">
                            <div className="tumor-stage1">
                              <input
                                id="tumor-widthin-milan-yes"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
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

                              <label htmlFor="tumor-widthin-milan-yes">
                                Yes (Single lesion 5 cm or less, OR up to 3
                                separate lesion none larger than 3 cm, AND
                                <br />
                                Nomacroscopic vascular invasion or distant
                                metastases): Microvascular invasion is OK
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                id="tumor-widthin-milan-no"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                              <label htmlFor="tumor-widthin-milan-no">
                                No (Single lesion>5 cm, OR >3 separate lesions
                                any larger than 3 cm, OR evidence of
                                <br /> macroscopic vascular invasion or distant
                                metastases)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                id="tumor-widthin-milan-notenough"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                              <label htmlFor="tumor-widthin-milan-notenough">
                                Not Enough Information
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <label className="label-txt">
                      Child-Pugh Classfication(at time of diagnosis)
                    </label>
                    <div className="chronic-mittal">
                      <div>
                        <input
                          className="gap"
                          id="child-pugh-classifcation-child-a"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                          className="gap"
                          id="child-pugh-classifcation-child-ab"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                          className="gap"
                          id="child-pugh-classifcation-child-b"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                          className="gap"
                          id="child-pugh-classifcation-child-c"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                          className="gap"
                          id="child-pugh-classifcation-child-unknown"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                    <div className="d-subject">
                      <label className="label-txt">
                        Barcelona Clinic Liver Cancer (BCLC) Stage
                      </label>
                      <div className="">
                        <div className="d-subject">
                          <div className="chronic-mittal">
                            <div className="tumor-stage1">
                              <input
                                id="barcelona-clinic-0"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  barcelonaClinic ===
                                  "Stage 0: Very early HCC (all criteria should be fulfilled)"
                                }
                                value={
                                  "Stage 0: Very early HCC (all criteria should be fulfilled)"
                                }
                                onChange={(e) =>
                                  setBarcelonaClinic(e.target.value)
                                }
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-0">
                                Stage 0: Very early HCC (all criteria should be
                                fulfilled)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                id="barcelona-clinic-stagea"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  barcelonaClinic ===
                                  "Stage A: early HCC (all criteria should be fulfilled)"
                                }
                                value={
                                  "Stage A: early HCC (all criteria should be fulfilled)"
                                }
                                onChange={(e) =>
                                  setBarcelonaClinic(e.target.value)
                                }
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-stagea">
                                Stage A: Early HCC (all criteria should be
                                fulfilled)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                id="barcelona-clinic-stageb"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  barcelonaClinic ===
                                  "Stage B: Intermediate HCC (all criteria should be fulfilled)"
                                }
                                value={
                                  "Stage B: Intermediate HCC (all criteria should be fulfilled)"
                                }
                                onChange={(e) =>
                                  setBarcelonaClinic(e.target.value)
                                }
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-stageb">
                                Stage B: Intermediate HCC (all criteria should
                                be Fulfilled)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                id="barcelona-clinic-stagec"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  barcelonaClinic ===
                                  "Stage C: advanced HCC(at least one criteria ECOG 1-2 or vascular invasion/extrahepatic spread)"
                                }
                                value={
                                  "Stage C: advanced HCC(at least one criteria ECOG 1-2 or vascular invasion/extrahepatic spread)"
                                }
                                onChange={(e) =>
                                  setBarcelonaClinic(e.target.value)
                                }
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-stagec">
                                Stage C: Advanced HCC(at least one criteria ECOG
                                1-2 or vascular invasion/extrahepatic spread)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                id="barcelona-clinic-staged"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  barcelonaClinic ===
                                  "Stage D: end-stage HCC(at least one criteria ECOG 3-4 or Child C)"
                                }
                                value={
                                  "Stage D: end-stage HCC(at least one criteria ECOG 3-4 or Child C)"
                                }
                                onChange={(e) =>
                                  setBarcelonaClinic(e.target.value)
                                }
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-stagec">
                                Stage D: End-stage HCC(at least one criteria
                                ECOG 3-4 or Child C)
                              </label>
                            </div>
                            <div className="tumor-stage1">
                              <input
                                id="barcelona-clinic-stage-not"
                                disabled={role === "ROLE_REVIEWER" || role === "qa"}
                                checked={
                                  barcelonaClinic ===
                                  "Not Available/cannot be calculated"
                                }
                                value={"Not Available/cannot be calculated"}
                                onChange={(e) =>
                                  setBarcelonaClinic(e.target.value)
                                }
                                name="Barcelona clinic liver cancer"
                                type="radio"
                              />
                              <label htmlFor="barcelona-clinic-stage-not">
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
        </div>
        {/* Chronic Liver disease (CLD)etiology     */}
        <div>
          <div className="study-container">
            <div className="studyData-container">
              <h1 className="study-txt">Chronic Liver Disease (CLD)Etiology</h1>
              <button
                type="button"
                onClick={chronicButtonHandle}
                className="study-btn"
              >
                {chronicButton ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={chronicButton ? "study-data" : ""}>
              <Fade>
                <div className="container-width">
                  <label className="label-txt">Is Fatty Liver Present?</label>
                  <input
                    // className="gap"
                    id="cld-yes"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    checked={fattyLiverCLD === "Yes"}
                    value={"Yes"}
                    onChange={(e) => setFattyLiverCLD(e.target.value)}
                    name="fattyLiver"
                    type="radio"
                  />
                  <label htmlFor="cld-yes">Yes</label>
                  <input
                    // className="gap"
                    id="cld-no"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    checked={fattyLiverCLD === "No"}
                    value={"No"}
                    onChange={(e) => setFattyLiverCLD(e.target.value)}
                    name="fattyLiver"
                    type="radio"
                  />
                  <label htmlFor="cld-no">No</label>
                  <input
                    // className="gap"
                    id="cld-unknown"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    checked={fattyLiverCLD === "Unknown"}
                    value={"Unknown"}
                    onChange={(e) => setFattyLiverCLD(e.target.value)}
                    name="fattyLiver"
                    type="radio"
                  />
                  <label htmlFor="cld-unknown">Unknown</label>
                </div>

                <div className="container-width-for-chronic">
                  <label className="label-txt">
                    Fatty Liver Diagnostic Modality
                  </label>
                  <input
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    className="chronicliver-ww"
                    value={"Imaging"}
                    onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                    name="fatty-modality"
                    type="radio"
                  />
                  <label>Imaging</label>
                  <input
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    className="chronicliver-ww margin-right-radio"
                    value={"Biopsy"}
                    onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                    name="fatty-modality"
                    type="radio"
                  />
                  <label>Biopsy</label>
                  <input
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    className="chronicliver-ww margin-right-radio"
                    value={"Clinical"}
                    onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                    name="fatty-modality"
                    type="radio"
                  />
                  <label>Clinical</label>
                  <input
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    className="chronicliver-ww margin-right-radio"
                    value={"Other"}
                    onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                    name="fatty-modality"
                    type="radio"
                  />
                  <label>Other</label>
                  <input
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    className="chronicliver-ww margin-right-radio"
                    value={"NA"}
                    onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                    name="fatty-modality"
                    type="radio"
                  />
                  <label>NA</label>
                </div>
                <div className="container-width">
                  <label htmlFor="fatty-liver-diagnostic" className="label-txt">
                    Fatty Liver Diagnostic Modality Free Text
                  </label>
                  <input
                    id="fatty-liver-diagnostic"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    // value={fattyLiverDiagnosticFreeText}
                    defaultValue={
                      onlyData?.section6?.fattyLiverDiagnosticFreeText
                    }
                    onChange={(e) =>
                      setFattyLiverDiagnosticFreeText(e.target.value)
                    }
                    className="input-width"
                    type="text"
                  />
                </div>
                <div className="container-width">
                  <label className="label-txt">Cirrhosis Status</label>
                  <input
                    className="gap"
                    id="cirrhosis-status-yes"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                    className="gap"
                    id="cirrhosis-status-no"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    checked={cirrhosisStatusValue === "No"}
                    value={"No"}
                    onChange={(e) => setCirrhosisStatusValue(e.target.value)}
                    name="cirrhosis-status-CLD"
                    type="radio"
                  />
                  <label className="cirrhosis" htmlFor="cirrhosis-status-no">
                    No
                  </label>
                  <input
                    className="gap"
                    id="cirrhosis-status-unknown"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    checked={cirrhosisStatusValue === "Unknown/unclassified"}
                    value={"Unknown/unclassified"}
                    onChange={(e) => setCirrhosisStatusValue(e.target.value)}
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
                <div className="container-width-for-chronic">
                  <label className="label-txt">Mittal's Criteria</label>
                  <div className="chronic-mittal">
                    <div className="mittal-bottom">
                      <input
                        id="mital-criteria-a"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                      <label htmlFor="mital-criteria-a">
                        (a) Level 1 Evidence (very high probability) of no
                        <br />
                        Cirrhosis
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="mital-criteria-b"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                      <label htmlFor="mital-criteria-b">
                        (b) Level 2 Evidence (high probability) of no cirrhosis,
                        <br />
                        which lacks histology but is based on imaging and
                        laboratory criteria
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="mital-criteria-c"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                      <label htmlFor="mital-criteria-c">
                        (c) Confirmed Cirrhosis, Which is based on Histological,
                        Imaging,
                        <br /> Clinical or Laboratory Criteria
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="mital-criteria-d"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                      <label htmlFor="mital-criteria-d">
                        (d) *Unclassified (insufficient data to classify into
                        any of the above
                        <br /> cirhosisi categories)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="container-width-for-chronic">
                  <label className="label-txt">Underlying Etiology</label>
                  <div className="chronic-mittal">
                    <div className="mittal-bottom">
                      <input
                        id="underlying-hcv"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          underlyingEtiologyValue === "HCV (Hepatitis C virus)"
                        }
                        value={"HCV (Hepatitis C virus)"}
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-hcv">
                        HCV (Hepatitis C virus)
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-hbv"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          underlyingEtiologyValue === "HBV (Hepatitis B virus)"
                        }
                        value={"HBV (Hepatitis B virus)"}
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-hbv">
                        HBV (Hepatitis B virus)
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-alcohol"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={underlyingEtiologyValue === "Alcohol"}
                        value={"Alcohol"}
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-alcohol">Alcohol</label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-nafld"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          underlyingEtiologyValue ===
                          "NAFLD (Non-alcoholic fatty liver disease)"
                        }
                        value={"NAFLD (Non-alcoholic fatty liver disease)"}
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-nafld">
                        NAFLD (Non-alcoholic fatty liver disease)
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-aih"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          underlyingEtiologyValue ===
                          "AIH (Autoimmune hepatitis)"
                        }
                        value={"AIH (Autoimmune hepatitis)"}
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-aih">
                        AIH (Autoimmune hepatitis)
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-pbc"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          underlyingEtiologyValue ===
                          "PBC (Primary biliary cholangitis/Primary biliary cirrhosis)"
                        }
                        value={
                          "PBC (Primary biliary cholangitis/Primary biliary cirrhosis)"
                        }
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-pbc">
                        PBC (Primary biliary cholangitis/Primary biliary
                        cirrhosis)
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-psc"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          underlyingEtiologyValue ===
                          "PSC (Primary sclerosing cholangitis)"
                        }
                        value={"PSC (Primary sclerosing cholangitis)"}
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-psc">
                        PSC (Primary sclerosing cholangitis)
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-hemochromatosis"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={underlyingEtiologyValue === "Hemochromatosis"}
                        value={"Hemochromatosis"}
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-hemochromatosis">
                        Hemochromatosis
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-alpha-1"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          underlyingEtiologyValue ===
                          "Alpha 1 antitrypsin deficiency"
                        }
                        value={"Alpha 1 antitrypsin deficiency"}
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-alpha-1">
                        Alpha 1 antitrypsin deficiency
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-other-etiologies"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={underlyingEtiologyValue === "Other etiologie"}
                        value={"Other etiologie"}
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-other-etiologies">
                        Other etiologies
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-idiopathic"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          underlyingEtiologyValue ===
                          "Idiopathic (enougth information but no obviouse etiology)"
                        }
                        value={
                          "Idiopathic (enougth information but no obviouse etiology)"
                        }
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-idiopathic">
                        Idiopathic (enougth information but no obviouse
                        etiology)
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="underlying-unknown"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          underlyingEtiologyValue ===
                          "Unknown etiology(not enough information)"
                        }
                        value={"Unknown etiology(not enough information)"}
                        onChange={(e) =>
                          setUnderlyingEtiologyValue(e.target.value)
                        }
                        name="underlying-etiology"
                        type="radio"
                      />
                      <label htmlFor="underlying-unknown">
                        Unknown etiology(not enough information)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="container-width">
                  <label htmlFor="etiology-cirrhosis" className="label-txt">
                    Etiology of Cirrhosis Free Text
                  </label>
                  <input
                    id="etiology-cirrhosis"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    // value={etiologyCirrhosisFreeValue}
                    defaultValue={
                      onlyData?.section6?.etiologyCirrhosisFreeValue || ""
                    }
                    onChange={(e) =>
                      setEtiologyCirrhosisFreeValue(e.target.value)
                    }
                    type="text"
                    className="input-width"
                  />
                </div>
                <div className="container-width-for-chronic">
                  <label className="label-txt">
                    Complications (at the time of HCC diagnosis)
                  </label>
                  <div className="chronic-mittal">
                    <div className="mittal-bottom">
                      <input
                        id="complications-ascites"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={complicationCLD === "Ascites"}
                        value={"complicationCLD"}
                        onChange={(e) => setComplicationCLD(e.target.value)}
                        name="complication"
                        type="radio"
                      />
                      <label htmlFor="complications-ascites">Ascites</label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="complications-encep"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={complicationCLD === "Encephalopathy"}
                        value={"Encephalopathy"}
                        onChange={(e) => setComplicationCLD(e.target.value)}
                        name="complication"
                        type="radio"
                      />
                      <label htmlFor="complications-encep">
                        Encephalopathy
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="complications-varices"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={complicationCLD === "Varices"}
                        value={"Varices"}
                        onChange={(e) => setComplicationCLD(e.target.value)}
                        name="complication"
                        type="radio"
                      />
                      <label htmlFor="complications-varices">Varices</label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="complications-sbp"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          complicationCLD ===
                          "SBP (Spontaneous Bacteria Peritonitis)"
                        }
                        value={"SBP (Spontaneous Bacteria Peritonitis)"}
                        onChange={(e) => setComplicationCLD(e.target.value)}
                        name="complication"
                        type="radio"
                      />
                      <label htmlFor="complications-sbp">
                        SBP (Spontaneous Bacteria Peritonitis)
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="complications-other"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          complicationCLD === "Other (renal failure, etc)"
                        }
                        value={"Other (renal failure, etc)"}
                        onChange={(e) => setComplicationCLD(e.target.value)}
                        name="complication"
                        type="radio"
                      />
                      <label htmlFor="complications-other">
                        Other (renal failure, etc)
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="complications-no-complication"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          complicationCLD === "No complications occurred"
                        }
                        value={"No complications occurred"}
                        onChange={(e) => setComplicationCLD(e.target.value)}
                        name="complication"
                        type="radio"
                      />
                      <label htmlFor="complications-no-complication">
                        No complications occurred
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="complications-information"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={
                          complicationCLD ===
                          "Information not availabel or not applicable (Patient not cirrhosis)"
                        }
                        value={
                          "Information not availabel or not applicable (Patient not cirrhosis)"
                        }
                        onChange={(e) => setComplicationCLD(e.target.value)}
                        name="complication"
                        type="radio"
                      />
                      <label htmlFor="complications-information">
                        Information not availabel or not applicable (Patient not
                        cirrhosis)
                      </label>
                    </div>
                    <div className="mittal-bottom">
                      <input
                        id="complications-portal"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        checked={complicationCLD === "Portal vein thrombosis"}
                        value={"Portal vein thrombosis"}
                        onChange={(e) => setComplicationCLD(e.target.value)}
                        name="complication"
                        type="radio"
                      />
                      <label htmlFor="complications-portal">
                        Portal vein thrombosis
                      </label>
                    </div>
                  </div>
                </div>
                {/* //////// */}

                <div>
                  <h1 className="sub-section-txt">HCC Outcome</h1>
                  <div className="container-width-for-chronic">
                    <label className="label-txt">Treatment Modalities</label>

                    <div className="chronic-mittal">
                      <div className="mittal-bottom">
                        <input
                          id="hcc-resection"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hccOutcomeValue === "Resection"}
                          value={"Resection"}
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          name="treatment-modalities-hcc"
                          type="radio"
                        />
                        <label htmlFor="hcc-resection">Resection</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          id="hcc-liver-transplatation"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hccOutcomeValue === "Liver transplantation"}
                          value={"Liver transplantation"}
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          name="treatment-modalities-hcc"
                          type="radio"
                        />
                        <label htmlFor="hcc-liver-transplatation">
                          Liver Transplantation
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          id="hcc-catheter"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={
                            hccOutcomeValue ===
                            "Catheter delivered therapy (y90, TACE, radioembolizationetc)"
                          }
                          value={
                            "Catheter delivered therapy (y90, TACE, radioembolizationetc)"
                          }
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          name="treatment-modalities-hcc"
                          type="radio"
                        />
                        <label htmlFor="hcc-catheter">
                          Catheter Delivered Therapy (y90, TACE,
                          Radioembolizationetc)
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          id="hcc-sorafenib"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hccOutcomeValue === "Sorafenib"}
                          value={"Sorafenib"}
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          name="treatment-modalities-hcc"
                          type="radio"
                        />
                        <label htmlFor="hcc-sorafenib">Sorafenib</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          id="hcc-radiation"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hccOutcomeValue === "Radiation(SBRT)"}
                          value={"Radiation(SBRT)"}
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          name="treatment-modalities-hcc"
                          type="radio"
                        />
                        <label htmlFor="hcc-radiation">Radiation(SBRT)</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          id="hcc-rfa"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hccOutcomeValue === "RFA ablation"}
                          value={"RFA ablation"}
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          name="treatment-modalities-hcc"
                          type="radio"
                        />
                        <label htmlFor="hcc-rfa">RFA Ablation</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          id="hcc-palliative"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={
                            hccOutcomeValue === "Palliative/hospice care"
                          }
                          value={"Palliative/hospice care"}
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          name="treatment-modalities-hcc"
                          type="radio"
                        />
                        <label htmlFor="hcc-palliative">
                          Palliative/Hospice care
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          id="hcc-other"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={
                            hccOutcomeValue === "Other (specify in freetext)"
                          }
                          value={"Other (specify in freetext)"}
                          name="treatment-modalities-hcc"
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          type="radio"
                        />
                        <label htmlFor="hcc-other">
                          Other (specify in freetext)
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          id="hcc-none"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={
                            hccOutcomeValue ===
                            "None (if patient was too sick, refused treatment,etc.)"
                          }
                          value={
                            "None (if patient was too sick, refused treatment,etc.)"
                          }
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          name="treatment-modalities-hcc"
                          type="radio"
                        />
                        <label htmlFor="hcc-none">
                          None (if patient was too sick, refused treatment,etc.)
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          id="hcc-unknown"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={
                            hccOutcomeValue ===
                            "Unknown (if patient was lost to follow-up or information not available in the chart)"
                          }
                          value={
                            "Unknown (if patient was lost to follow-up or information not available in the chart)"
                          }
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          name="treatment-modalities-hcc"
                          type="radio"
                        />
                        <label htmlFor="hcc-unknown">
                          Unknown (if patient was lost to follow-up or
                          information not available in the chart)
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          id="hcc-microwave"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={hccOutcomeValue === "Microwave ablation"}
                          value={"Microwave ablation"}
                          onChange={(e) => setHccOutcomeValue(e.target.value)}
                          name="treatment-modalities-hcc"
                          type="radio"
                        />
                        <label htmlFor="hcc-microwave">
                          Microwave ablation
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="container-width">
                    <label
                      htmlFor="treatment-explain-free"
                      className="label-txt"
                    >
                      Treatment Modalities Explanation(free text)
                    </label>
                    <input
                      id="treatment-explain-free"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      // value={treamentModalitiesHCC}
                      defaultValue={onlyData?.section6?.treamentModalitiesHCC}
                      onChange={(e) => setTreamentModalitiesHCC(e.target.value)}
                      type="text"
                      className="input-width"
                    />
                  </div>
                  <div>
                    <h1 className="sub-section-txt">
                      If resection was performed:
                    </h1>
                    <div className="container-width-for-chronic">
                      <label className="label-txt">
                        Stage of Fibrosis in Background Liver
                      </label>
                      <div className="chronic-mittal">
                        <div className="mittal-bottom">
                          <input
                            id="hcc-performed-none"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={resectionPerformed === "None/F0"}
                            value={"None/F0"}
                            onChange={(e) =>
                              setResectionPerformed(e.target.value)
                            }
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-none">None/F0</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="hcc-performed-mild"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={resectionPerformed === "Mild/stage 1/F1"}
                            value={"Mild/stage 1/F1"}
                            onChange={(e) =>
                              setResectionPerformed(e.target.value)
                            }
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-mild">
                            Mild/Stage 1/F1
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="hcc-performed-moderate"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={
                              resectionPerformed === "Moderate/stage 2/F2"
                            }
                            value={"Moderate/stage 2/F2"}
                            onChange={(e) =>
                              setResectionPerformed(e.target.value)
                            }
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-moderate">
                            Moderate/Stage 2/F2
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="hcc-performed-bridiging"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={
                              resectionPerformed ===
                              "Bridiging fibrosis/stage 3F3"
                            }
                            value={"Bridiging fibrosis/stage 3F3"}
                            onChange={(e) =>
                              setResectionPerformed(e.target.value)
                            }
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-bridiging">
                            Bridiging Fibrosis/Stage 3F3
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="hcc-performed-cirrhosis"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={
                              resectionPerformed === "Cirrhosis/stage 4/F4"
                            }
                            value={"Cirrhosis/stage 4/F4"}
                            onChange={(e) =>
                              setResectionPerformed(e.target.value)
                            }
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-cirrhosis">
                            Cirrhosis/Stage 4/F4
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="hcc-performed-unknown"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={resectionPerformed === "Unknown"}
                            value={"Unknown"}
                            onChange={(e) =>
                              setResectionPerformed(e.target.value)
                            }
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-unknown">Unknown</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="sub-section-txt">
                      If liver transplant was performed:
                    </h1>
                    <div className="container-width-for-chronic">
                      <label className="label-txt">
                        Stage of Fibrosis in Explanted Liver
                      </label>
                      <div className="chronic-mittal">
                        <div className="mittal-bottom">
                          <input
                            id="liver-transplant-none"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={liverTransplantValue === "None/F0"}
                            value={"None/F0"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            name="explanted liver"
                            type="radio"
                          />
                          <label htmlFor="liver-transplant">None/F0</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="liver-transplant-mild"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={liverTransplantValue === "Mild/stage 1/F1"}
                            value={"Mild/stage 1/F1"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            name="explanted liver"
                            type="radio"
                          />
                          <label htmlFor="liver-transplant-mild">
                            Mild/Stage 1/F1
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="liver-transplant-moderate"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={
                              liverTransplantValue === "Moderate/stage 2/F2"
                            }
                            value={"Moderate/stage 2/F2"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            name="explanted liver"
                            type="radio"
                          />
                          <label htmlFor="liver-transplant-moderate">
                            Moderate/Stage 2/F2
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="liver-transplant-bridiging"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                          <label htmlFor="liver-transplant-bridiging">
                            Bridiging Fibrosis/Stage 3F3
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="liver-transplant-cirrhosis"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                          <label htmlFor="liver-transplant-cirrhosis">
                            Cirrhosis/Stage 4/F4
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="liver-transplant-unknown"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={liverTransplantValue === "Unknown"}
                            value={"Unknown"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            name="explanted liver"
                            type="radio"
                          />
                          <label htmlFor="liver-transplant-unknown">
                            Unknown
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-width-for-chronic">
                    <label className="label-txt">Recurrence ?</label>
                    <div className="container-widthd-comorbidities">
                      <div className="gaps-recurrence">
                        <input
                          className="margin-right-radio"
                          id="recurrence-yes"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={recurrenceValue === "Yes once"}
                          value={"Yes once"}
                          onChange={(e) => setRecurrenceValue(e.target.value)}
                          name="Recurrence"
                          type="radio"
                        />
                        <label htmlFor="recurrence-yes">Yes Once</label>
                        <input
                          className="margin-right-radio"
                          id="recurrence-yes-more"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={recurrenceValue === "Yes more than once"}
                          value={"Yes more than once"}
                          onChange={(e) => setRecurrenceValue(e.target.value)}
                          name="Recurrence"
                          type="radio"
                        />
                        <label htmlFor="recurrence-yes-more">
                          Yes More Than Once
                        </label>
                        <input
                          className="margin-right-radio"
                          id="recurrence-no"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={recurrenceValue === "No"}
                          value={"No"}
                          onChange={(e) => setRecurrenceValue(e.target.value)}
                          name="Recurrence"
                          type="radio"
                        />
                        <label htmlFor="recurrence-no">No</label>
                        <input
                          className="margin-right-radio"
                          id="recurrence-unknown"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={recurrenceValue === "Unknown/patient not"}
                          value={"Unknown/patient not"}
                          onChange={(e) => setRecurrenceValue(e.target.value)}
                          name="Recurrence"
                          type="radio"
                        />
                        <label htmlFor="recurrence-unknown">
                          Unknown/Patient Not
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label className="label-txt">
                        Date of First Recurrence
                      </label>
                      <input
                        type="date"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={
                          onlyData?.section6?.selectedDateOfFirstRecurrence
                        }
                        onChange={(e) =>
                          setSelectedDateOfFirstRecurrence(e.target.value)
                        }
                        className="input-width"
                      />
                      {/* <DatePicker
                        className="dd"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        selected={
                          onlyData?.section6?.selectedDateOfFirstRecurrence
                        }
                        onChange={handleDateOfFirstRecurrence}
                        dateFormat="dd-MMM-yyyy"
                        placeholderText="DD-MMM-YYYY"
                        style={{
                          width: "50%",
                          backgroundColor: "yellow",
                        }}
                        popperPlacement="right"
                      /> */}
                    </div>
                    <label className="red-txt">(First recurrence only)</label>
                  </div>
                  <div className="container-width">
                    <label className="label-txt">Survival Status</label>
                    <div className="container-width">
                      <div className="container-width">
                        <input
                          className="margin-right-radio"
                          id="survival-status-alive"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={survivalStatusValue === "Alive"}
                          value={"Alive"}
                          onChange={(e) =>
                            setSurvivalStatusValue(e.target.value)
                          }
                          name="survival status"
                          type="radio"
                        />
                        <label htmlFor="survival-status-alive">Alive</label>
                        <input
                          className="margin-right-radio"
                          id="survival-status-deceased"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={survivalStatusValue === "Deceased"}
                          value={"Deceased"}
                          onChange={(e) =>
                            setSurvivalStatusValue(e.target.value)
                          }
                          name="survival status"
                          type="radio"
                        />
                        <label htmlFor="survival-status-deceased">
                          Deceased
                        </label>
                        <input
                          className="margin-right-radio"
                          id="survival-status-unknown"
                          disabled={role === "ROLE_REVIEWER" || role === "qa"}
                          checked={survivalStatusValue === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) =>
                            setSurvivalStatusValue(e.target.value)
                          }
                          name="survival status"
                          type="radio"
                        />
                        <label htmlFor="survival-status-unknown">Unknown</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label className="label-txt">Date of Death</label>
                      <input
                        type="date"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={onlyData?.section6?.selectedDateOfDeath}
                        onChange={(e) => setSelectedDateOfDeath(e.target.value)}
                        className="input-width"
                      />
                      {/* <DatePicker
                        className="dd"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        selected={onlyData?.section6?.selectedDateOfDeath}
                        onChange={handleCDateOfDeath}
                        dateFormat="dd-MMM-yyyy"
                        placeholderText="DD-MMM-YYYY"
                        style={{
                          fontSize: "14px",
                        }}
                        popperPlacement="right"
                      /> */}
                    </div>
                    <label>or</label>
                    <input disabled className="chronicliver-ww1" type="radio" />
                    <label>Unknown</label>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label className="label-txt">
                        Date of Last Contact(if patient is alive or dead)
                      </label>
                      <input
                        type="date"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={
                          onlyData?.section6?.selectedDateOfLastContact
                        }
                        onChange={(e) =>
                          setSelectedDateOfLastContact(e.target.value)
                        }
                        className="input-width"
                      />
                      {/* <DatePicker
                        className="dd"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        selected={onlyData?.section6?.selectedDateOfLastContact}
                        onChange={handleCDateOfLastContact}
                        dateFormat="dd-MMM-yyyy"
                        placeholderText="DD-MMM-YYYY"
                        style={{
                          fontSize: "14px",
                        }}
                        popperPlacement="right"
                      /> */}
                    </div>
                    <label>or</label>
                    <input disabled className="chronicliver-ww1" type="radio" />
                    <label>Unknown</label>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label className="label-txt">
                        Recurrence-free Survival(days)
                      </label>
                      <input
                        type="date"
                        defaultValue={
                          onlyData?.section6?.selectedDateOfRecurrenceFree
                        }
                        onChange={(e) =>
                          setSelectedDateOfRecurrenceFree(e.target.value)
                        }
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        className="input-width"
                      />
                      {/* <DatePicker
                        className="dd"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        selected={
                          onlyData?.sectio6?.selectedDateOfRecurrenceFree
                        }
                        onChange={handleCDateOfRecurrenceFree}
                        dateFormat="dd-MMM-yyyy"
                        placeholderText="DD-MMM-YYYY"
                        style={{
                          fontSize: "14px",
                        }}
                        popperPlacement="right"
                      /> */}
                    </div>
                    <label className="red-txt">
                      (Date of first resection or liver transplant to date of
                      first recurrenct)
                    </label>
                  </div>
                  <div className="d-subject">
                    <div className="container-width">
                      <label className="label-txt">
                        Overall Survival(days)
                      </label>
                      <input
                        type="date"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        defaultValue={
                          onlyData?.section6?.selectedDateOfOverallSurvival
                        }
                        onChange={(e) =>
                          setSelectedDateOfOverallSurvival(e.target.value)
                        }
                        className="input-width"
                      />
                      {/* <DatePicker
                        className="dd"
                        disabled={role === "ROLE_REVIEWER" || role === "qa"}
                        selected={
                          onlyData?.sectio6?.selectedDateOfOverallSurvival
                        }
                        onChange={handleCDateOfOverallSurvival}
                        dateFormat="dd-MMM-yyyy"
                        placeholderText="DD-MMM-YYYY"
                        style={{
                          fontSize: "14px",
                        }}
                        popperPlacement="right"
                      /> */}
                    </div>
                    <label className="red-txt">
                      (Date of first resection or liver transplant to date of
                      first recurrenct)
                    </label>
                  </div>
                  <div>
                    <h1 className="sub-section-txt">Screening Question</h1>

                    <div className="container-width-for-chronic">
                      <label className="label-txt">
                        How was the HCC Diagnosed?
                      </label>
                      <div className="chronic-mittal">
                        <div className="mittal-bottom">
                          <input
                            id="screen-question-part"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={screeningQuestion === "Part of screening"}
                            value={"Part of screening"}
                            onChange={(e) => {
                              const s = e.target.value;
                              if (s === "NA/Unknown") {
                                setScreeningQuestionNa("");
                              } else {
                                setScreeningQuestionNa("");
                              }
                              setScreeningQuestionValue(s);
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
                            id="screen-question-incidental"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={screeningQuestion === "Incidental"}
                            value={"Incidental"}
                            onChange={(e) => {
                              const s = e.target.value;
                              if (s === "NA/Unknown") {
                                setScreeningQuestionNa("");
                              } else {
                                setScreeningQuestionNa("");
                              }
                              setScreeningQuestionValue(s);
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
                            id="screen-question-symptoms"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={screeningQuestion === "Symptoms work-up"}
                            value={"Symptoms work-up"}
                            onChange={(e) => {
                              const s = e.target.value;
                              if (s === "NA/Unknown") {
                                setScreeningQuestionNa("");
                              } else {
                                setScreeningQuestionNa("");
                              }
                              setScreeningQuestionValue(s);
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
                            id="screen-question-na"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={screeningQuestion === "NA/Unknown"}
                            value={"NA/Unknown"}
                            onChange={(e) =>
                              setScreeningQuestionValue(e.target.value)
                            }
                            name="screen question"
                            type="radio"
                          />
                          <label htmlFor="screen-question-na">NA/Unknown</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            id="screen-question-other"
                            disabled={role === "ROLE_REVIEWER" || role === "qa"}
                            checked={screeningQuestion === "Other"}
                            value={"Other"}
                            onChange={(e) => {
                              const s = e.target.value;
                              if (s === "NA/Unknown") {
                                setScreeningQuestionNa("");
                              } else {
                                setScreeningQuestionNa("");
                              }
                              setScreeningQuestionValue(s);
                            }}
                            name="screen question"
                            type="radio"
                          />
                          <label htmlFor="screen-question-other">Other</label>

                          <input
                            disabled={
                              screeningQuestion !== "NA/Unknown" ||
                              role === "ROLE_REVIEWER" ||
                              role === "qa"
                            }
                            defaultValue={
                              onlyData?.section6?.screeningQuestionNa || ""
                            }
                            // value={screeningQuestionNa}
                            onChange={(e) =>
                              setScreeningQuestionNa(e.target.value)
                            }
                            className="label-txt"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="container-width">
                      <div className="cld-last">
                        <label className="label-txt">
                          Any Method of Screening Found within 2 Years Before
                        </label>
                        <input
                          className="radio-right-gap"
                          name="any-method"
                          type="radio"
                        />
                        <label>Yes</label>
                        <input
                          className="radio-right-gap"
                          name="any-method"
                          type="radio"
                        />
                        <label>No</label>
                        <input
                          className="radio-right-gap"
                          name="any-method"
                          type="radio"
                        />
                        <label>Unknown</label>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
              {/* /////////// */}
            </div>
          </div>
        </div>
        {/* HIV Specific Lab Data */}
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
                {hivSpecificButton ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>

            <div className={hivSpecificButton ? "study-data" : ""}>
              <Fade>
                <div className="container-width-for-chronic">
                  <label className="label-txt" htmlFor="study-title">
                    History of HIV
                  </label>
                  <input
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    checked={historyHIV === "Yes"}
                    onChange={(e) => setHistoryHiv(e.target.value)}
                    value={"Yes"}
                    name="history-of-hiv"
                    id="history-yes"
                    type="radio"
                  />
                  <label htmlFor="history-yes">Yes</label>
                  <input
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
                    checked={historyHIV === "No"}
                    onChange={(e) => setHistoryHiv(e.target.value)}
                    value={"No"}
                    name="history-of-hiv"
                    id="history-no"
                    type="radio"
                  />
                  <label htmlFor="history-no">No</label>
                  (If yes complete the below details)
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label className="label-txt" htmlFor="project-no">
                      Year of HIV Diagnosis
                    </label>
                    <input
                      // value={yearOfHIVHCC}
                      //

                      defaultValue={onlyData?.section7?.yearOfHIVHCC}
                      min={1900}
                      max={2040}
                      disabled={
                        historyHIV !== "Yes" ||
                        role === "ROLE_REVIEWER" ||
                        role === "qa"
                      }
                      onChange={(e) => setYearOfHIVHCC(e.target.value)}
                      className="input-width"
                      type="number"
                      placeholder="YYYY"
                    />
                  </div>
                </div>
                <div className="d-subject">
                  <div className="container-widthd-comorbidities">
                    <label className="label-txt">Duration of HIV(years)</label>
                    <div className="container-width">
                      <input
                        min={1900}
                        max={2040}
                        defaultValue={onlyData?.section7?.dateOfHIVDurationFrom}
                        disabled={
                          role === "ROLE_REVIEWER" ||
                          role === "qa" ||
                          historyHIV !== "Yes"
                        }
                        onChange={(e) =>
                          setDateOfHIVDurationFrom(e.target.value)
                        }
                        placeholder="YYYY"
                        className="v"
                        type="number"
                      />

                      <input
                        min={1900}
                        max={2040}
                        defaultValue={onlyData?.section7?.dateOfHIVDurationTo}
                        disabled={
                          role === "ROLE_REVIEWER" ||
                          role === "qa" ||
                          historyHIV !== "Yes"
                        }
                        onChange={(e) => setDateOfHIVDurationTo(e.target.value)}
                        placeholder="YYYY"
                        className="v"
                        type="number"
                      />
                      <label className="red-txt">
                        (First Field always less than Second Field)
                      </label>
                    </div>
                    {/* <DatePicker
                      className="dd"
                      disabled={
                        historyHIV !== "Yes" ||
                        role === "ROLE_REVIEWER" ||
                        role === "qa"
                      }
                      selected={onlyData?.section7?.dateOfHIVDuration}
                      onChange={handleDateOfHIVDuration}
                      dateFormat="dd-MMM-yyyy"
                      placeholderText="DD-MMM-YYYY"
                      style={{}}
                      popperPlacement="right"
                    /> */}
                  </div>
                </div>
                <div className="container-width">
                  <label htmlFor="hiv-rna-level" className="label-txt">
                    HIV RNA Level (most recent)
                  </label>
                  <input
                    id="hiv-rna-level"
                    // value={hivRNAHCC}

                    defaultValue={onlyData?.section7?.hivRNAHCC}
                    disabled={
                      historyHIV !== "Yes" ||
                      role === "ROLE_REVIEWER" ||
                      role === "qa"
                    }
                    onChange={(e) => setHIVRNAHCC(e.target.value)}
                    className="input-width"
                    type="text"
                  />
                </div>
                <div className="container-width">
                  <label className="label-txt">
                    If HIV RNA Level is Below Lower Limit of Detect
                  </label>
                  <input
                    disabled={
                      role === "ROLE_REVIEWER" ||
                      role === "qa" ||
                      historyHIV !== "Yes"
                    }
                    // disabled={historyHIV !== "Yes"}
                    className="chronicliver-ww"
                    type="radio"
                  />
                  <label>Below Lower Limit of Detection</label>
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label htmlFor="cd4-hiv" className="label-txt">
                      CD4 (%) (Clusters of differentiation 4)
                    </label>
                    <input
                      // value={hivCD4}
                      disabled={
                        role === "ROLE_REVIEWER" ||
                        role === "qa" ||
                        historyHIV !== "Yes"
                      }
                      defaultValue={onlyData?.section7?.hivCD4}
                      onChange={(e) => setHIVCD4(e.target.value)}
                      id="cd4-hiv"
                      type="text"
                      className="input-width"
                    />
                  </div>
                  <div>
                    <input disabled type="radio" id="nav-1" />
                    <label>NAV</label>
                  </div>
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label htmlFor="absolute-hiv" className="label-txt">
                      Absolute CD4 (cells/uL)
                    </label>
                    <input
                      id="absolute-hiv"
                      disabled={
                        role === "ROLE_REVIEWER" ||
                        role === "qa" ||
                        historyHIV !== "Yes"
                      }
                      // disabled={historyHIV !== "Yes"}
                      // value={hivAbsoluteCD4}
                      defaultValue={onlyData?.section7?.hivAbsoluteCD4}
                      onChange={(e) => setHivAbsoluteCD4(e.target.value)}
                      type="text"
                      className="input-width"
                    />
                  </div>
                  <div>
                    <input disabled type="radio" id="nav-2" />
                    <label htmlFor="nav-2">NAV</label>
                  </div>
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label htmlFor="cd4-cellhiv" className="label-txt">
                      CD4 Cell Count Nadir (if known)
                    </label>
                    <input
                      // value={hivCD4CellCount}
                      disabled={
                        role === "ROLE_REVIEWER" ||
                        role === "qa" ||
                        historyHIV !== "Yes"
                      }
                      defaultValue={onlyData?.section7?.hivCD4CellCount}
                      // disabled={historyHIV !== "Yes"}
                      onChange={(e) => setHIVCD4CellCount(e.target.value)}
                      id="cd4-cellhiv"
                      type="text"
                      className="input-width"
                    />
                  </div>
                  <div>
                    <input disabled type="radio" id="nav-3" />
                    <label htmlFor="nav-3">NAV</label>
                  </div>
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label htmlFor="initial-hiv" className="label-txt">
                      Initial HIV-1 RNA Level (if known)
                    </label>
                    <input
                      id="initial-hiv"
                      disabled={
                        role === "ROLE_REVIEWER" ||
                        role === "qa" ||
                        historyHIV !== "Yes"
                      }
                      defaultValue={onlyData?.section7?.hivInitialHIV1}
                      // disabled={historyHIV !== "Yes"}
                      // value={hivInitialHIV1}
                      onChange={(e) => setHivInitialHIV1(e.target.value)}
                      type="text"
                      className="input-width"
                    />
                  </div>
                  <div>
                    <input disabled type="radio" id="nav-4" />
                    <label htmlFor="nav-4">NAV</label>
                  </div>
                </div>
                <div className="d-subject">
                  <div className="container-width">
                    <label htmlFor="max-hiv" className="label-txt">
                      Maximum HIV-1 RNA Level (if known)
                    </label>
                    <input
                      // value={maximumHIVRNA}
                      disabled={
                        role === "ROLE_REVIEWER" ||
                        role === "qa" ||
                        historyHIV !== "Yes"
                      }
                      defaultValue={onlyData?.section7?.maximumHIVRNA}
                      // disabled={historyHIV !== "Yes"}
                      onChange={(e) => setMaximumHIVRNA(e.target.value)}
                      id="max-hiv"
                      type="text"
                      className="input-width"
                    />
                  </div>
                  <div>
                    <input disabled type="radio" id="nav-5" />
                    <label htmlFor="nav-5">NAV</label>
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
                {hepatitisCVirusButton ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={hepatitisCVirusButton ? "study-data" : ""}>
              <div className="container-width">
                <label className="label-txt">
                  Is Date of HCV Diagnosis Known?
                </label>
                <input
                  id="is-date-hcv-yes"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={isDateHCVDiagnosis === "Yes"}
                  value={"Yes"}
                  onChange={(e) => setIsDateHCVDiagnosis(e.target.value)}
                  name="Is date of HCV diagnosis known"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="is-date-hcv-yes">Yes</label>
                <input
                  id="is-date-hcv-no"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={isDateHCVDiagnosis === "No"}
                  value={"No"}
                  onChange={(e) => setIsDateHCVDiagnosis(e.target.value)}
                  name="Is date of HCV diagnosis known"
                  type="radio"
                  className="chronicliver-ww margin-right-radio"
                />
                <label htmlFor="is-date-hcv-no">No</label>
                <input
                  id="is-date-hcv-unknown"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={isDateHCVDiagnosis === "Unknown"}
                  value={"Unknown"}
                  onChange={(e) => setIsDateHCVDiagnosis(e.target.value)}
                  name="Is date of HCV diagnosis known"
                  type="radio"
                  className="chronicliver-ww margin-right-radio"
                />
                <label htmlFor="is-date-hcv-unknown">Unknown</label>
              </div>
              <div className="container-width">
                <label className="label-txt">Date of HCV Diagnosis</label>
                <input
                  type="date"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  onChange={(e) => setDateOfHCVCVirus(e.target.value)}
                  defaultValue={onlyData?.section8?.dateOfHCVCVirus}
                  className="input-width"
                />
                {/* <DatePicker
                  className="dd"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  selected={onlyData?.section8?.dateOfHCVCVirus}
                  onChange={handleDateOfHCVCVirus}
                  dateFormat="dd-MMM-yyyy"
                  placeholderText="DD-MMM-YYYY"
                  style={{}}
                  popperPlacement="right" 
                />*/}
              </div>
              <div className="container-width">
                <label className="label-txt">Is HCV Viral Load Known</label>
                <input
                  className="margin-right-radio"
                  id="hcv-load-yes"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={isHCViralCVirus === "Yes"}
                  value={"Yes"}
                  onChange={(e) => setIsHCViralCVirus(e.target.value)}
                  name="Is HCV viral load known"
                  type="radio"
                />
                <label htmlFor="hcv-load-yes">Yes</label>
                <input
                  className="margin-right-radio"
                  id="hcv-load-no"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={isHCViralCVirus === "No"}
                  value={"No"}
                  onChange={(e) => setIsHCViralCVirus(e.target.value)}
                  name="Is HCV viral load known"
                  type="radio"
                />
                <label htmlFor="hcv-load-no">No</label>
                <input
                  className="margin-right-radio"
                  id="hcv-load-unknown"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={isHCViralCVirus === "Unknown"}
                  value={"Unknown"}
                  onChange={(e) => setIsHCViralCVirus(e.target.value)}
                  name="Is HCV viral load known"
                  type="radio"
                />
                <label htmlFor="hcv-load-unknown">Unknown</label>
              </div>
              <div className="container-width">
                <label className="label-txt">
                  HCV Viral Load at Time of HCC Diagnosis
                </label>
                <input
                  // value={HCVviralTimeOfHCCDiagnosis}
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  defaultValue={onlyData?.section8?.HCVviralTimeOfHCCDiagnosis}
                  onChange={(e) =>
                    setHCVviralTimeOfHCCDiagnosis(e.target.value)
                  }
                  type="number"
                  className="input-width"
                />
              </div>
              <div className="container-width">
                <label className="label-txt">HCV Genotype</label>
                <div className="chronic-mittal">
                  <div className="mittal-bottom">
                    <input
                      id="hcvgenotype1a"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvGenotype === "1a"}
                      value={"1a"}
                      onChange={(e) => setHCVGenotype(e.target.value)}
                      name="HCV genotype"
                      type="radio"
                    />
                    <label htmlFor="hcvgenotype1a">1a</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcvgenotype1b"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvGenotype === "1b"}
                      value={"1b"}
                      onChange={(e) => setHCVGenotype(e.target.value)}
                      name="HCV genotype"
                      type="radio"
                    />
                    <label htmlFor="hcvgenotype1b">1b</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="1 unknown"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvGenotype === "1 unknown"}
                      value={"1 unknown"}
                      onChange={(e) => setHCVGenotype(e.target.value)}
                      name="HCV genotype"
                      type="radio"
                    />
                    <label htmlFor="1 unknown">1 Unknown</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcvgenotype2"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvGenotype === "2"}
                      value={"2"}
                      onChange={(e) => setHCVGenotype(e.target.value)}
                      name="HCV genotype"
                      type="radio"
                    />
                    <label htmlFor="hcvgenotype2">2</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcvgenotype3"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvGenotype === "3"}
                      value={"3"}
                      onChange={(e) => setHCVGenotype(e.target.value)}
                      name="HCV genotype"
                      type="radio"
                    />
                    <label htmlFor="hcvgenotype3">3</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcvgenotype4"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvGenotype === "4"}
                      value={"4"}
                      onChange={(e) => setHCVGenotype(e.target.value)}
                      name="HCV genotype"
                      type="radio"
                    />
                    <label htmlFor="hcvgenotype4">4</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcvgenotype5"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvGenotype === "5"}
                      value={"5"}
                      onChange={(e) => setHCVGenotype(e.target.value)}
                      name="HCV genotype"
                      type="radio"
                    />
                    <label htmlFor="hcvgenotype5">5</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcvgenotype6"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvGenotype === "6"}
                      value={"6"}
                      onChange={(e) => setHCVGenotype(e.target.value)}
                      name="HCV genotype"
                      type="radio"
                    />
                    <label htmlFor="hcvgenotype6">6</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcvgenotypeunknown"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvGenotype === "Unknown"}
                      value={"Unknown"}
                      onChange={(e) => setHCVGenotype(e.target.value)}
                      name="HCV genotype"
                      type="radio"
                    />
                    <label htmlFor="hcvgenotypeunknown">Unknown</label>
                  </div>
                </div>
              </div>
              <div className="container-width">
                <label className="label-txt">
                  Was HCV Treatment Received Before or After
                </label>
                <div>
                  <input
                    className="margin-right-radio"
                    id="Beforewas"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                    className="margin-right-radio"
                    id="Afterwas"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                    id="Not applicablewas"
                    className="margin-right-radio"
                    disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
              <div className="container-width">
                <label className="label-txt">HCV Treatment Type</label>
                <div className="chronic-mittal">
                  <div className="mittal-bottom">
                    <input
                      id="hcv-treatmentDaa"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={
                        hcvTreatmentCVirus === "DAA (direct acting antiviral)"
                      }
                      value={"DAA (direct acting antiviral)"}
                      onChange={(e) => setHcvTreatmentCVirus(e.target.value)}
                      name="HCV treatment typeC"
                      type="radio"
                    />
                    <label htmlFor="hcv-treatmentDaa">
                      DAA (direct-acting antiviral)
                    </label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcv-protease"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvTreatmentCVirus === "Protease inhibitor"}
                      value={"Protease inhibitor"}
                      onChange={(e) => setHcvTreatmentCVirus(e.target.value)}
                      name="HCV treatment typeC"
                      type="radio"
                    />
                    <label htmlFor="hcv-protease">Protease Inhibitor</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcv-peg"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvTreatmentCVirus === "Peg interferon"}
                      value={"Peg interferon"}
                      onChange={(e) => setHcvTreatmentCVirus(e.target.value)}
                      name="HCV treatment typeC"
                      type="radio"
                    />
                    <label htmlFor="hcv-peg">Peg Interferon</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcv-ribavirin"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvTreatmentCVirus === "Ribavirin"}
                      value={"Ribavirin"}
                      onChange={(e) => setHcvTreatmentCVirus(e.target.value)}
                      name="HCV treatment typeC"
                      type="radio"
                    />
                    <label htmlFor="hcv-ribavirin">Ribavirin</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcv-interferon"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvTreatmentCVirus === "Interferon alpha"}
                      value={"Interferon alpha"}
                      onChange={(e) => setHcvTreatmentCVirus(e.target.value)}
                      name="HCV treatment typeC"
                      type="radio"
                    />
                    <label htmlFor="hcv-interferon">Interferon Alpha</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcv-unknown"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvTreatmentCVirus === "Unknown"}
                      value={"Unknown"}
                      onChange={(e) => setHcvTreatmentCVirus(e.target.value)}
                      name="HCV treatment typeC"
                      type="radio"
                    />
                    <label htmlFor="hcv-unknown">Unknown</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="hcv-notreatment"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvTreatmentCVirus === "No treatment received"}
                      value={"No treatment received"}
                      onChange={(e) => setHcvTreatmentCVirus(e.target.value)}
                      name="HCV treatment typeC"
                      type="radio"
                    />
                    <label htmlFor="hcv-notreatment">
                      No Treatment Received
                    </label>
                  </div>
                </div>
              </div>
              <div className="container-width">
                <label className="label-txt">When was HCV Treated (year)</label>
                <input
                  placeholder="YYYY"
                  // value={hcvTreatedYear}
                  min={1900}
                  max={2040}
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  defaultValue={onlyData?.section8?.hcvTreatedYear}
                  onChange={(e) => setHCVTreatedYear(e.target.value)}
                  className="input-width"
                  type="number"
                />
              </div>
              <div className="container-width">
                <label className="label-txt">
                  Is HCV Viral Load after Treatment Known?
                </label>
                <input
                  id="treament-hcv-yes"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                  id="treatment-hcv-no"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={hcvViralLoadAfterTreatment === "No"}
                  value={"No"}
                  onChange={(e) =>
                    setHcvViralLoadAfterTreatment(e.target.value)
                  }
                  name="Is HCV viral load after treatment known?"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="treatment-hcv-no">No</label>
                <input
                  id="treatment-hcv-unknown"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={hcvViralLoadAfterTreatment === "Unknown"}
                  value={"Unknown"}
                  onChange={(e) =>
                    setHcvViralLoadAfterTreatment(e.target.value)
                  }
                  name="Is HCV viral load after treatment known?"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="treatment-hcv-unknown">Unknown</label>
              </div>
              <div className="container-width">
                <label className="label-txt">
                  HCV Viral Load Post Treatment
                </label>
                <input
                  className="input-width"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  type="number"
                  // value={hcvPostTreatment}
                  defaultValue={onlyData?.section8?.hcvPostTreatment}
                  onChange={(e) => setHcvPostTreatment(e.target.value)}
                />
              </div>
              <div className="container-width">
                <label className="label-txt">
                  Sustained Virological Response (SVR) after
                </label>
                <input
                  id="sustained-yes"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={sustainedHCV === "Yes"}
                  value={"Yes"}
                  onChange={(e) => setSustainedHcv(e.target.value)}
                  name="Sustained virological response (SVR) after"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="sustained-yes">Yes</label>
                <input
                  id="sustained-no"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={sustainedHCV === "No"}
                  value={"No"}
                  onChange={(e) => setSustainedHcv(e.target.value)}
                  name="Sustained virological response (SVR) after"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="sustained-no">No</label>
                <input
                  id="sustained-unknown"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={sustainedHCV === "Unknown"}
                  value={"Unknown"}
                  onChange={(e) => setSustainedHcv(e.target.value)}
                  name="Sustained virological response (SVR) after"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="sustained-unknown">Unknown</label>
              </div>
              <div className="container-width">
                <label htmlFor="year-svr-hcc" className="label-txt">
                  Year SVR Achieved
                </label>
                <input
                  id="year-svr-hcc"
                  min={1900}
                  max={2040}
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  // value={yearSVRHCV}
                  defaultValue={onlyData?.section8?.yearSVRHCV}
                  onChange={(e) => setYearSVRHCV(e.target.value)}
                  placeholder="YYYY"
                  className="input-width"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
        {/*=========================== Hepatitis B virus (HBV) ===========================*/}
        <div>
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
                {hepatitisBVirusButton ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={hepatitisBVirusButton ? "study-data" : ""}>
              <div className="container-width">
                <label className="label-txt">
                  Is Date of HBV Diagnosis Known?
                </label>
                <input
                  id="is-Date-BVirusYes"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  value={"Yes"}
                  onChange={(e) => setIsDateHBVDiagnosis(e.target.value)}
                  checked={isDateHBVDiagnosis === "Yes"}
                  name="Is date of HBV diagnosis known?"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="is-Date-BVirusYes">Yes</label>
                <input
                  id="is-Date-BVirusNo"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  value={"No"}
                  onChange={(e) => setIsDateHBVDiagnosis(e.target.value)}
                  checked={isDateHBVDiagnosis === "No"}
                  name="Is date of HBV diagnosis known?"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="is-Date-BVirusNo">No</label>
                <input
                  id="is-Date-BVirusUnknown"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  value={"Unknown"}
                  checked={isDateHBVDiagnosis === "Unknown"}
                  onChange={(e) => setIsDateHBVDiagnosis(e.target.value)}
                  name="Is date of HBV diagnosis known?"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="is-Date-BVirusUnknown">Unknown</label>
              </div>
              <div className="container-width">
                <label className="label-txt">Date of HBV Diagnosis</label>
                <input
                  type="date"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  defaultValue={onlyData?.section9?.dateOfHBVBVirus}
                  onChange={(e) => setDateOfHBVBVirus(e.target.value)}
                  className="input-width"
                />
                {/* <DatePicker
                  className="dd"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  selected={onlyData?.section9?.dateOfHBVBVirus}
                  onChange={handleDateOfHBVBVirus}
                  dateFormat="dd-MMM-yyyy"
                  placeholderText="DD-MMM-YYYY"
                  style={{}}
                  popperPlacement="right"
                /> */}
              </div>
              <div className="container-width">
                <label className="label-txt">Is HBV Viral Load Known</label>
                <input
                  className="margin-right-radio"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={isHBViralBVirus === "Yes"}
                  value={"Yes"}
                  onChange={(e) => setIsHBViralBVirus(e.target.value)}
                  id="is HBV viral load knownYes"
                  name="Is HBV viral load known"
                  type="radio"
                />
                <label htmlFor="is HBV viral load knownYes">Yes</label>
                <input
                  className="margin-right-radio"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={isHBViralBVirus === "No"}
                  value={"No"}
                  onChange={(e) => setIsHBViralBVirus(e.target.value)}
                  id="is HBV viral load knownNo"
                  name="Is HBV viral load known"
                  type="radio"
                />
                <label htmlFor="is HBV viral load knownNo">No</label>
                <input
                  className="margin-right-radio"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={isHBViralBVirus === "Unknown"}
                  value={"Unknown"}
                  onChange={(e) => setIsHBViralBVirus(e.target.value)}
                  id="is HBV viral load knownUnknown"
                  name="Is HBV viral load known"
                  type="radio"
                />
                <label htmlFor="is HBV viral load knownUnknown">Unknown</label>
              </div>
              <div className="container-width">
                <label className="label-txt">
                  HBV Viral Load at Time of HCC Diagnosis
                </label>
                <input
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  // value={HBVviralTimeOfHCCDiagnosis}
                  defaultValue={onlyData?.section9?.HBVviralTimeOfHCCDiagnosis}
                  onChange={(e) =>
                    setHBVviralTimeOfHCCDiagnosis(e.target.value)
                  }
                  type="number"
                  className="input-width"
                />
              </div>
              <div className="container-width">
                <label className="label-txt">
                  Was HBV Treatment Received Before or After
                </label>
                <input
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={wasHBVReceivedBeforeAfter === "After"}
                  value={"After"}
                  onChange={(e) => setWasHBVReceivedBeforeAfter(e.target.value)}
                  id="afterwas"
                  name="Was HBV treatment received before or after B"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="afterwas">After</label>
                <input
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={wasHBVReceivedBeforeAfter === "Not applicable"}
                  value={"Not applicable"}
                  onChange={(e) => setWasHBVReceivedBeforeAfter(e.target.value)}
                  id="not-applicablewas"
                  name="Was HBV treatment received before or after B"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="not-applicablewas">Not applicable</label>
              </div>
              <div className="container-width">
                <label className="label-txt">HBV Treatment Type</label>
                <div className="chronic-mittal">
                  <div className="mittal-bottom">
                    <input
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      id="lamivudineHcv"
                      checked={hcvTreatmentBVirus === "Lamivudine"}
                      value={"Lamivudine"}
                      onChange={(e) => setHcvTreatmentBVirus(e.target.value)}
                      name="HCV treatment type B"
                      type="radio"
                    />
                    <label htmlFor="lamivudineHcv">Lamivudine</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      id="tenofovirHcv"
                      checked={hcvTreatmentBVirus === "Tenofovir"}
                      value={"Tenofovir"}
                      onChange={(e) => setHcvTreatmentBVirus(e.target.value)}
                      name="HCV treatment type B"
                      type="radio"
                    />
                    <label htmlFor="tenofovirHcv">Tenofovir</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      id="entecavirHcv"
                      checked={hcvTreatmentBVirus === "Entecavir"}
                      value={"Entecavir"}
                      onChange={(e) => setHcvTreatmentBVirus(e.target.value)}
                      name="HCV treatment type B"
                      type="radio"
                    />
                    <label htmlFor="entecavirHcv">Entecavir</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="enterferonHcv"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvTreatmentBVirus === "Interferon alpha"}
                      value={"Interferon alpha"}
                      onChange={(e) => setHcvTreatmentBVirus(e.target.value)}
                      name="HCV treatment type B"
                      type="radio"
                    />
                    <label htmlFor="enterferonHcv">Interferon alpha</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="unknownHcv"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvTreatmentBVirus === "Unknown"}
                      value={"Unknown"}
                      onChange={(e) => setHcvTreatmentBVirus(e.target.value)}
                      name="HCV treatment type B"
                      type="radio"
                    />
                    <label htmlFor="unknownHcv">Unknown</label>
                  </div>
                  <div className="mittal-bottom">
                    <input
                      id="no-treatmentHcv"
                      disabled={role === "ROLE_REVIEWER" || role === "qa"}
                      checked={hcvTreatmentBVirus === "No treatment received"}
                      value={"No treatment received"}
                      onChange={(e) => setHcvTreatmentBVirus(e.target.value)}
                      name="HCV treatment type B"
                      type="radio"
                    />
                    <label htmlFor="no-treatmentHcv">
                      No Treatment Received
                    </label>
                  </div>
                </div>
              </div>
              <div className="container-width">
                <label className="label-txt">When was HBV Treated (year)</label>
                <input
                  type="text"
                  min={1900}
                  max={2040}
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  defaultValue={onlyData?.section9?.dateOfHBVTreatmentYear}
                  onChange={(e) => setDateOfHBVTreatmentYear(e.target.value)}
                  className="input-width"
                />
                {/* <DatePicker
                  className="dd"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  selected={onlyData?.section9?.dateOfHBVTreatmentYear}
                  onChange={handleDateOfHBVTreatmentYear}
                  dateFormat="dd-MMM-yyyy"
                  placeholderText="DD-MMM-YYYY"
                  style={{}}
                  popperPlacement="right"
                /> */}
              </div>
              <div className="container-width">
                <label className="label-txt">
                  Is HBV Viral Load after Treatment Known?
                </label>
                <input
                  id="yes-hbv-after"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
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
                  id="no-hbv-after"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={hbvViralLoadAfterTreatment === "No"}
                  value={"No"}
                  onChange={(e) =>
                    setHbvViralLoadAfterTreatment(e.target.value)
                  }
                  name="Is HBV viral load after treatment known? B"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="no-hbv-after">No</label>
                <input
                  id="unknown-hbv-after"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  checked={hbvViralLoadAfterTreatment === "Unknown"}
                  value={"Unknown"}
                  onChange={(e) =>
                    setHbvViralLoadAfterTreatment(e.target.value)
                  }
                  name="Is HBV viral load after treatment known? B"
                  className="chronicliver-ww margin-right-radio"
                  type="radio"
                />
                <label htmlFor="unknown-hbv-after">Unknown</label>
              </div>
              <div className="container-width">
                <label htmlFor="hbv-post-treatment" className="label-txt">
                  HBV Viral Load Post Treatment
                </label>
                <input
                  id="hbv-post-treatment"
                  disabled={role === "ROLE_REVIEWER" || role === "qa"}
                  // value={hbvPostTreatment}
                  defaultValue={onlyData?.section9?.hbvPostTreatment}
                  onChange={(e) => setHbvPostTreatment(e.target.value)}
                  className="input-width"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
        {
          <div className="columns">
            <textarea
              // value={commentsData}
              defaultValue={onlyData?.comments?.commentsData}
              onChange={(e) => {
                setComments(e.target.value);
              }}
              placeholder="Add Comments Here"
              className="text-comment"
              rows={7}
              cols={500}
            ></textarea>
          </div>
        }
        {role === "ROLE_DATAENTRY" && (
          <div>
            <button
              className="data-entry-btn"
              onClick={() => reviewButton("ROLE_REVIEWER")}
              type="button"
            >
              Submit to Reviewer
            </button>
          </div>
        )}
        {role === "ROLE_REVIEWER" && (
          <div>
            <button
              className="bb-btn"
              onClick={() => reviewButton("ROLE_DATAENTRY")}
              type="button"
            >
              Send Back To Data Entry
            </button>
            <button
              className="bb-back"
              onClick={() => reviewButton("qa")}
              type="button"
            >
              Send To QA
            </button>
          </div>
        )}
        {role === "qa" && (
          <div>
            <button
              className="bb-btn"
              onClick={() => reviewButton("ROLE_REVIEWER")}
              type="button"
            >
              Send Back To Review
            </button>
            <button
              className="bb-back"
              onClick={() => reviewButton("completed")}
              type="button"
            >
              Completed
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Values;
