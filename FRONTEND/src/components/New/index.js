import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment, { duration, fn } from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import { jwtDecode } from "jwt-decode";
import { Form } from 'react-bootstrap';
import config from "../../config";
import { Modal } from 'react-bootstrap';

const Reused = () => {
  // studyData initialization
  const [commentTxt, setCommentTxt] = useState("");
  const navigate = useNavigate();
  const [onlyData, setOnlyData] = useState();
  const { formID } = useParams();
  const [auditData, setAuditData] = useState([]);
  const [studyTitles, setStudyTitles] = useState([]);
  const [studyProjects, setStudyProjects] = useState([]);
  const { apiUrl } = config;
  const [showModal, setShowModal] = useState(false);
  const [commentFCName, setCommentFCName] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [commentSection, setCommentSection] = useState("");
  const [tmpComment, setTmpComment] = useState("");
  const [commentsData, setCommentsData] = useState({
    "section1": {
      "studyTitle": "",
      "projectNo": "",
      "siteId": "",
      "studyDate": ""
    },
    "section2": {
      "subjectCounter": "",
      "subjectYear": "",
      "subjectUnknown": "",
      "subjectGender": "",
      "otherCheck": "",
      "subjectOtherText": "",
      "placeOfBirthCity": "",
      "placeOfBirthState": "",
      "residencyCity": "",
      "residencyState": ""
    },
    "section3": {
      "dateOfHcc": "",
      "baseLineIfDate": "",
      "baseLineIfDateRadio": "",
      "baseLineAgeOfHcc": "",
      "baseLineHeight": "",
      "weightHggBaseLine": "",
      "bmiBaseLine": "",
      "insuranceValue": "",
      "insuraceValueOtherBaseline": "",
      "insuraceDetailsBaseLine": ""
    },
    "section4": {
      "hemoGlobinFrom": "",
      "hemoGlobinTo": "",
      "hemoGlobinValue": "",
      "hemoGlobinUnknown": "",
      "alanineFrom": "",
      "alanineTo": "",
      "alanineValue": "",
      "alanineUnknown": "",
      "aspartateFrom": "",
      "aspartateTo": "",
      "aspartateValue": "",
      "aspartateUnknown": "",
      "bilirubinFrom": "",
      "bilirubinTo": "",
      "bilirubinValue": "",
      "bilirubinUnknown": "",
      "alkalineFrom": "",
      "alkalineTo": "",
      "alkalineValue": "",
      "alkalineUnknown": "",
      "albuminFrom": "",
      "albuminTo": "",
      "albuminValue": "",
      "albuminUnknown": "",
      "platelatesFrom": "",
      "platelatesTo": "",
      "platelatesValue": "",
      "platelatesUnknown": "",
      "creatinineFrom": "",
      "creatinineTo": "",
      "creatinineValue": "",
      "creatinineUnknown": "",
      "prothrombinFrom": "",
      "prothrombinTo": "",
      "prothrombinValue": "",
      "prothrombinUnknown": "",
      "internationalFrom": "",
      "internationalTo": "",
      "internationalValue": "",
      "internationalUnknown": "",
      "alphaFrom": "",
      "alphaTo": "",
      "alphaValue": "",
      "alphaUnknown": "",
      "sodiumFrom": "",
      "sodiumTo": "",
      "sodiumValue": "",
      "sodiumUnknown": "",
      "bloodUreaFrom": "",
      "bloodUreaTo": "",
      "bloodUreaValue": "",
      "bloodUreaUnknown": "",
      "cholesterolFrom": "",
      "cholesterolTo": "",
      "cholesterolValue": "",
      "cholesterolUnknown": "",
      "triglyceridesFrom": "",
      "triglyceridesTo": "",
      "triglyceridesValue": "",
      "triglyceridesUnknown": "",
      "highDenistyFrom": "",
      "highDensityTo": "",
      "highDensityValue": "",
      "highDensityUnknown": "",
      "lowDensityFrom": "",
      "lowDensityTo": "",
      "lowDensityValue": "",
      "lowDensityUnknown": "",
      "meldScoreLab": 0,
      "modelEndStageTextArea": "",
      "modelEndStageLab": "",
      "fib4Lab": "",
      "astPlateletLab": ""
    },
    "section5": {
      "diabetesComorbidities": "",
      "hypertensionComorbidities": "",
      "dyslipidemiaComorbidities": "",
      "coronaryComorbidities": "",
      "peripheralComorbidities": "",
      "hivComorbidities": "",
      "diabetesAfter": "",
      "hypertensionAfter": "",
      "dysliAfter": "",
      "coronaryAfter": "",
      "peripheralAfter": "",
      "hivAfter": "",
      "yesDiabetesInput": "",
      "yesHyperTensionInput": "",
      "yesDyslipidemiaInput": "",
      "yesCoronaryInput": "",
      "yesPeripheralInput": "",
      "yesHivInput": "",
      "nonLiverCancer": "",
      "yesLocationSiteValue": "",
      "yesStageValue": "",
      "yesYearOfDiagnosis": "",
      "alcoholConsumptionValue": "",
      "alcoholConsumptionValueSub": ""
    },
    "section6": {
      "diagnosisInformationValue": "",
      "hccDiagnosisInfoValueOtherSpecify": "",
      "typeOfImagine": "",
      "typeOfImagineText": "",
      "hccDiagnosisImagingUnkown": "",
      "hccDiagnosisTissueUnknown": "",
      "hccDiagnosisImagingDate": "",
      "hccDiagnosisTissueDate": ""
    },
    "section7": {
      "largeTurmorValue": "",
      "tPrimaryValue": "",
      "nRegionalValue": "",
      "mRegionalValue": "",
      "anatomicStageTNM": "",
      "tumorDiffValue": "",
      "ecogperformace": "",
      "tumorStageValue": "",
      "typeOfVascular": "",
      "microvascularInvasion": "",
      "tumorWithinMilan": "",
      "childPughClassfication": "",
      "barcelonaClinic": ""
    },
    "section8": {
      "fattyLiverCLD": "",
      "fattyLiverRadioLast": "",
      "fattyLiverDiagnosticFreeText": "",
      "cirrhosisStatusValue": "",
      "mittalCriteriaValue": "",
      "underlyingEtiologyValue": "",
      "etiologyCirrhosisFreeValue": "",
      "complicationCLD": ""
    },
    "section9": {
      "hccOutcomeValue": "",
      "treamentModalitiesHCC": "",
      "resectionPerformed": "",
      "liverTransplantValue": "",
      "recurrenceValue": "",
      "selectedDateOfFirstRecurrence": "",
      "survivalStatusValue": "",
      "selectedDateOfDeath": "",
      "dateOfDeathUnknown": "",
      "selectedDateOfLastContact": "",
      "lastContactUnknown": "",
      "selectedDateOfRecurrenceFree": "",
      "selectedDateOfOverallSurvival": ""
    },
    "section10": {
      "screeningQuestion": "",
      "screeningQuestionNa": "",
      "screening2Years": "",
      "screening1Year": "",
      "methodOfScreening": "",
      "methodOfScreeningTxt": ""
    },
    "section11": {
      "historyHIV": "",
      "yearOfHIVHCC": "",
      "dateOfHIVDurationFrom": "",
      "hivRNAHCC": "",
      "belowRadioHCC": "",
      "hivCD4": "",
      "hivCD4Nav": "",
      "hivAbsoluteCD4": "",
      "hivAbsoluteCD4Nav": "",
      "hivCD4CellCount": "",
      "hivCD4CellCountNav": "",
      "hivInitialHIV1": "",
      "hivInitialHIV1Nav": "",
      "maximumHIVRNA": "",
      "maximumHIVRNANav": ""
    },
    "section12": {
      "isDateHCVDiagnosis": "",
      "dateOfHCVCVirus": "",
      "isHCViralCVirus": "",
      "HCVviralTimeOfHCCDiagnosis": "",
      "hcvGenotype": "",
      "wasHCVReceivedBeforeAfter": "",
      "hcvTreatmentCVirus": "",
      "hcvTreatedYear": "",
      "hcvViralLoadAfterTreatment": "",
      "hcvPostTreatment": "",
      "sustainedHCV": "",
      "yearSVRHCV": ""
    },
    "section13": {
      "isDateHBVDiagnosis": "",
      "dateOfHBVBVirus": "",
      "isHBViralBVirus": "",
      "HBVviralTimeOfHCCDiagnosis": "",
      "wasHBVReceivedBeforeAfter": "",
      "hcvTreatmentBVirus": "",
      "dateOfHBVTreatmentYear": "",
      "hbvViralLoadAfterTreatment": "",
      "hbvPostTreatment": ""
    },
    "section14": {
      "createdBy": "",
      "createdOn": "",
      "changedBy": "",
      "changedOn": ""
    }
  });
  const sectionDetails = [{
    key: 'section1',
    value: 'Study Data'
  }, {
    key: 'section2',
    value: 'Subject Data'
  }, {
    key: 'section3',
    value: 'Baseline Characteristics'
  }, {
    key: 'section4',
    value: 'Laboratory Parameters most recent and within 6 months of the HCC diagnosis'
  }, {
    key: 'section5',
    value: 'Comorbidities'
  }, {
    key: 'section6',
    value: 'HCC Diagnosis Information'
  }, {
    key: 'section7',
    value: 'HCC Staging'
  }, {
    key: 'section8',
    value: 'Chronic Liver Disease (CLD)Etiology'
  }, {
    key: 'section9',
    value: 'HCC Outcomes'
  }, {
    key: 'section10',
    value: 'Screening Questions'
  }, {
    key: 'section11',
    value: 'HIV-Specific Lab Data within 6 months of HCC diagnosis'
  }, {
    key: 'section12',
    value: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis'
  }, {
    key: 'section13',
    value: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis'
  }];
  /* useEffect(() => {
    // console.log(auditData);
  }, [auditData]); */

  // useEffect(() => {
  //   console.log("commentsData", commentsData);
  // }, [commentsData]);

  useEffect(() => {
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
        setOnlyData(data);
      });
  }, []);

  useEffect(() => {
    if (onlyData && onlyData?.section1) {
      setStudyTitle(onlyData?.section1?.studyTitle);
      setProjectNo(onlyData?.section1?.projectNo);
      // setSiteId(onlyData?.section1?.siteId);
      setStudyDate(onlyData?.section1?.studyDate);
    }

    if (onlyData && onlyData?.section2) {
      setSubjectId(onlyData?.subjectId);
      setSubjectCounter(onlyData?.section2?.subjectCounter);
      setSubjectYear(onlyData?.section2?.subjectYear);
      setSubjectUnknown(onlyData?.section2?.subjectUnknown);
      setSubjectGender(onlyData?.section2?.subjectGender);
      setSubjectOtherText(onlyData?.section2?.subjectOtherText);
      setOtherCheck(onlyData?.section2?.otherCheck);
      setPlaceOfBirthCity(onlyData?.section2?.placeOfBirthCity);
      setPlaceOfBirthState(onlyData?.section2?.placeOfBirthState);
      setResidencyCity(onlyData?.section2?.residencyCity);
      setResidencyState(onlyData?.section2?.residencyState);
    }

    if (onlyData && onlyData?.section3) {
      setDateOfHcc(onlyData?.section3?.dateOfHcc);
      setBaseLineIfDate(onlyData?.section3?.baseLineIfDate);
      setBaseLineIfDateRadio(onlyData?.section3?.baseLineIfDateRadio);
      setBaseLineAgeOfHcc(onlyData?.section3?.baseLineAgeOfHcc);
      setBaseLineHeight(onlyData?.section3?.baseLineHeight);
      setWeightHggBaseLine(onlyData?.section3?.weightHggBaseLine);
      setBmiBaseLine(onlyData?.section3?.bmiBaseLine);
      setInsuranceValue(onlyData?.section3?.insuranceValue);
      setInsuranceValueOtherBaseline(
        onlyData?.section3?.insuraceValueOtherBaseline
      );
      setInsuranceDetailsBaseLine(onlyData?.section3?.insuraceDetailsBaseLine);
    }

    if (onlyData && onlyData?.section4) {
      setHemoGlobinFrom(onlyData?.section4?.hemoGlobinFrom);
      setHemoGlobinTo(onlyData?.section4?.hemoGlobinTo);
      setHemoglobinValue(onlyData?.section4?.hemoGlobinValue);
      setHemoGlobinUnknown(onlyData?.section4?.hemoGlobinUnknown);

      setAlanineFrom(onlyData?.section4?.alanineFrom);
      setAlanineTo(onlyData?.section4?.alanineTo);
      setAlanineValue(onlyData?.section4?.alanineValue);
      setAlanineUnknown(onlyData?.section4?.alanineUnknown);

      setAspartateFrom(onlyData?.section4?.aspartateFrom);
      setAspartateTo(onlyData?.section4?.aspartateTo);
      setAspartateValue(onlyData?.section4?.aspartateValue);
      setAspartateUnknown(onlyData?.section4?.aspartateUnknown);

      setBilirubinFrom(onlyData?.section4?.bilirubinFrom);
      setBilirubinTo(onlyData?.section4?.bilirubinTo);
      setBilirubinValue(onlyData?.section4?.bilirubinValue);
      setBilirubinUnknown(onlyData?.section4?.bilirubinUnknown);

      setAlkalineFrom(onlyData?.section4?.alkalineFrom);
      setAlkalineTo(onlyData?.section4?.alkalineTo);
      setAlkalineValue(onlyData?.section4?.alkalineValue);
      setAlkalineUnknown(onlyData?.section4?.alkalineUnknown);

      setAlbuminFrom(onlyData?.section4?.albuminFrom);
      setAlbuminTo(onlyData?.section4?.albuminTo);
      setAlbuminValue(onlyData?.section4?.albuminValue);
      setAlbuminUnknown(onlyData?.section4?.albuminUnknown);

      setPlatelatesFrom(onlyData?.section4?.platelatesFrom);
      setPlatelatesTo(onlyData?.section4?.platelatesTo);
      setPlatelatesValue(onlyData?.section4?.platelatesValue);
      setPlatelatesUnknown(onlyData?.section4?.platelatesUnknown);

      setCreatinineFrom(onlyData?.section4?.creatinineFrom);
      setCreatinineTo(onlyData?.section4?.creatinineTo);
      setCreatinineValue(onlyData?.section4?.creatinineValue);
      setCreatinineUnknown(onlyData?.section4?.creatinineUnknown);

      setProthrombinFrom(onlyData?.section4?.prothrombinFrom);
      setProthrombinTo(onlyData?.section4?.prothrombinTo);
      setProthrombinValue(onlyData?.section4?.prothrombinValue);
      setProthrombinUnknown(onlyData?.section4?.prothrombinUnknown);

      setInternationalFrom(onlyData?.section4?.internationalFrom);
      setinternationalTo(onlyData?.section4?.internationalTo);
      setInternationalValue(onlyData?.section4?.internationalValue);
      setInternationalUnknown(onlyData?.section4?.internationalUnknown);

      setAlphaFrom(onlyData?.section4?.alphaFrom);
      setAlphaTo(onlyData?.section4?.alphaTo);
      setAlphaValue(onlyData?.section4?.alphaValue);
      setAlphaUnknown(onlyData?.section4?.alphaUnknown);

      setSodiumFrom(onlyData?.section4?.sodiumFrom);
      setSodiumTo(onlyData?.section4?.sodiumTo);
      setSodiumValue(onlyData?.section4?.sodiumValue);
      setSodiumUnknown(onlyData?.section4?.sodiumUnknown);

      setBloodUreaFrom(onlyData?.section4?.bloodUreaFrom);
      setBloodUreaTo(onlyData?.section4?.bloodUreaTo);
      setBloodUreaValue(onlyData?.section4?.bloodUreaValue);
      setBloodUreaUnknown(onlyData?.section4?.bloodUreaUnknown);

      setCholesterolFrom(onlyData?.section4?.cholesterolFrom);
      setCholesterolTo(onlyData?.section4?.cholesterolTo);
      setCholesterolValue(onlyData?.section4?.cholesterolValue);
      setCholesterolUnknown(onlyData?.section4?.cholesterolUnknown);

      setTriglyceridesFrom(onlyData?.section4?.triglyceridesFrom);
      setTriglyceridesTo(onlyData?.section4?.triglyceridesTo);
      setTriglyceridesValue(onlyData?.section4?.triglyceridesValue);
      setTriglyceridesUnknown(onlyData?.section4?.triglyceridesUnknown);

      setHighDenistyFrom(onlyData?.section4?.highDenistyFrom);
      setHighDensityTo(onlyData?.section4?.highDensityTo);
      setHighDensityValue(onlyData?.section4?.highDensityValue);
      setHighDensityUnknown(onlyData?.section4?.highDensityUnknown);

      setLowDensityFrom(onlyData?.section4?.lowDensityFrom);
      setLowDensityTo(onlyData?.section4?.lowDensityTo);
      setLowDensityValue(onlyData?.section4?.lowDensityValue);
      setLowDensityUnknown(onlyData?.section4?.lowDensityUnknown);

      setMeldScoreLab(onlyData?.section4?.meldScoreLab);
      setModelEndStageLab(onlyData?.section4?.modelEndStageLab);
      setModelEndStageTextArea(onlyData?.section4?.modelEndStageTextArea);
      setFIB4Lab(onlyData?.section4?.fib4Lab);
      setastPlateletLab(onlyData?.section4?.astPlateletLab);
    }

    if (onlyData && onlyData?.section5) {
      setComorbiditiesDiabetes(onlyData?.section5?.diabetesComorbidities);
      setComorbiditiesHypertension(
        onlyData?.section5?.hypertensionComorbidities
      );
      setComorbiditiesDyslipidemia(
        onlyData?.section5?.dyslipidemiaComorbidities
      );
      setComorbiditiesCoronary(onlyData?.section5?.coronaryComorbidities);
      setComorbiditiesPeripheral(onlyData?.section5?.peripheralComorbidities);
      setComorbiditiesHiv(onlyData?.section5?.hivComorbidities);

      setDiabetesAfter(onlyData?.section5?.diabetesAfter);
      setHypertensionAfter(onlyData?.section5?.hypertensionAfter);
      setDyslipidemiaAfter(onlyData?.section5?.dysliAfter);
      setCoronaryAfter(onlyData?.section5?.coronaryAfter);
      setPeripheralAfter(onlyData?.section5?.peripheralAfter);
      setHIVAfter(onlyData?.section5?.hivAfter);

      setNonLiverCancer(onlyData?.section5?.nonLiverCancer);
      setYesLocationSiteValue(onlyData?.section5?.yesLocationSiteValue);
      setYesStageValue(onlyData?.section5?.yesStageValue);
      setYesYearOfdiagnosis(onlyData?.section5?.yesYearOfDiagnosis);

      setYesDiabetesInput(onlyData?.section5?.yesDiabetesInput);
      setYesHyperTensionInput(onlyData?.section5?.yesHyperTensionInput);
      setYesDyslipidemiaInput(onlyData?.section5?.yesDyslipidemiaInput);
      setYesCoronaryInput(onlyData?.section5?.yesCoronaryInput);
      setYesPeripheralInput(onlyData?.section5?.yesPeripheralInput);
      setYesHivInput(onlyData?.section5?.yesHivInput);

      setAlcoholConsumptionValue(onlyData?.section5?.alcoholConsumptionValue);
      setAlcoholConsumptionValueSub(
        onlyData?.section5?.alcoholConsumptionValueSub
      );
    }

    if (onlyData && onlyData?.section6) {
      setDiagnosisInformationValue(
        onlyData?.section6?.diagnosisInformationValue
      );
      sethccDiagnosisInfo(
        onlyData?.section6?.hccDiagnosisInfoValueOtherSpecify
      );
      setTypeOfImagine(onlyData?.section6?.typeOfImagine);
      setTypeOfImagineText(onlyData?.section6?.typeOfImagineText);
      sethccDiagnosisImaging(onlyData?.section6?.hccDiagnosisImagingUnkown);
      sethccDiagnosisTissueUnknown(
        onlyData?.section6?.hccDiagnosisTissueUnknown
      );
      sethccDiagnosisImagingDate(onlyData?.section6?.hccDiagnosisImagingDate);
      sethccDiagnosisTissueDate(onlyData?.section6?.hccDiagnosisTissueDate);
    }

    if (onlyData && onlyData?.section7) {
      setLargeTurmorValue(onlyData?.section7?.largeTurmorValue);
      setTPrimaryValue(onlyData?.section7?.tPrimaryValue);
      setNRegionalValue(onlyData?.section7?.nRegionalValue);
      setMRegionalValue(onlyData?.section7?.mRegionalValue);
      setAnatomicStageTNM(onlyData?.section7?.anatomicStageTNM);
      setTumorDiffValue(onlyData?.section7?.tumorDiffValue);
      setEcogPerformace(onlyData?.section7?.ecogperformace);
      setTumorStageValue(onlyData?.section7?.tumorStageValue);
      setTypeOfVascular(onlyData?.section7?.typeOfVascular);
      setMicrovascularInvasion(onlyData?.section7?.microvascularInvasion);
      setTumorWithinMilan(onlyData?.section7?.tumorWithinMilan);
      setChildPughClassfication(onlyData?.section7?.childPughClassfication);
      setBarcelonaClinic(onlyData?.section7?.barcelonaClinic);
    }

    if (onlyData && onlyData?.section8) {
      setFattyLiverCLD(onlyData?.section8?.fattyLiverCLD);
      setFattyLiverRadioLast(onlyData?.section8?.fattyLiverRadioLast);
      setFattyLiverDiagnosticFreeText(
        onlyData?.section8?.fattyLiverDiagnosticFreeText
      );
      setCirrhosisStatusValue(onlyData?.section8?.cirrhosisStatusValue);
      setMittalCriteriaValue(onlyData?.section8?.mittalCriteriaValue);
      setUnderlyingEtiologyValue(onlyData?.section8?.underlyingEtiologyValue);
      setEtiologyCirrhosisFreeValue(
        onlyData?.section8?.etiologyCirrhosisFreeValue
      );
      setComplicationCLD(onlyData?.section8?.complicationCLD);
    }

    if (onlyData && onlyData?.section9) {
      setHccOutcomeValue(onlyData?.section9?.hccOutcomeValue);
      setTreamentModalitiesHCC(onlyData?.section9?.treamentModalitiesHCC);
      setResectionPerformed(onlyData?.section9?.resectionPerformed);
      setLiverTransplantValue(onlyData?.section9?.liverTransplantValue);
      setRecurrenceValue(onlyData?.section9?.recurrenceValue);
      setSelectedDateOfFirstRecurrence(
        onlyData?.section9?.selectedDateOfFirstRecurrence
      );
      setSurvivalStatusValue(onlyData?.section9?.survivalStatusValue);
      setSelectedDateOfDeath(onlyData?.section9?.selectedDateOfDeath);
      setDateOfDeathUnkown(onlyData?.section9?.dateOfDeathUnknown);
      setSelectedDateOfLastContact(
        onlyData?.section9?.selectedDateOfLastContact
      );
      setLastContactUnknown(onlyData?.section9?.lastContactUnknown);
      setSelectedDateOfRecurrenceFree(
        onlyData?.section9?.selectedDateOfRecurrenceFree
      );
      setSelectedDateOfOverallSurvival(
        onlyData?.section9?.selectedDateOfOverallSurvival
      );
    }

    if (onlyData && onlyData?.section10) {
      setScreeningQuestionValue(onlyData?.section10?.screeningQuestion);
      setScreeningQuestionNa(onlyData?.section10?.screeningQuestionNa);
      setScreening2Years(onlyData?.section10?.screening2Years);
      setScreening1Year(onlyData?.section10?.screening1Year);
      setMethodOfScreening(onlyData?.section10?.methodOfScreening);
      setMethodOfScreeningTxt(onlyData?.section10?.methodOfScreeningTxt);
    }

    if (onlyData && onlyData?.section11) {
      setHistoryHiv(onlyData?.section11?.historyHIV);
      setYearOfHIVHCC(onlyData?.section11?.yearOfHIVHCC);
      setDateOfHIVDurationFrom(onlyData?.section11?.dateOfHIVDurationFrom);
      setBelowRadioHCC(onlyData?.section11?.belowRadioHCC);
      setBelowLimitDefect(onlyData?.section11?.belowLimitDefect);
      setHIVRNAHCC(onlyData?.section11?.hivRNAHCC);
      setHIVCD4(onlyData?.section11?.hivCD4);
      setHivAbsoluteCD4(onlyData?.section11?.hivAbsoluteCD4);
      setHIVCD4CellCount(onlyData?.section11?.hivCD4CellCount);
      setHivInitialHIV1(onlyData?.section11?.hivInitialHIV1);
      setMaximumHIVRNA(onlyData?.section11?.maximumHIVRNA);
      setHIVCD4Nav(onlyData?.section11?.hivCD4Nav);
      setHivAbsoluteCD4Nav(onlyData?.section11?.hivAbsoluteCD4Nav);
      setHIVCD4CellCountNav(onlyData?.section11?.hivCD4CellCountNav);
      setHivInitialHIV1Nav(onlyData?.section11?.hivInitialHIV1Nav);
      setMaximumHIVRNANav(onlyData?.section11?.maximumHIVRNANav);
    }

    if (onlyData && onlyData?.section12) {
      setIsDateHCVDiagnosis(onlyData?.section12?.isDateHCVDiagnosis);
      setDateOfHCVCVirus(onlyData?.section12?.dateOfHCVCVirus);
      setIsHCViralCVirus(onlyData?.section12?.isHCViralCVirus);
      setHCVviralTimeOfHCCDiagnosis(
        onlyData?.section12?.HCVviralTimeOfHCCDiagnosis
      );
      setHCVGenotype(onlyData?.section12?.hcvGenotype);
      setWasHCVReceivedBeforeAfter(
        onlyData?.section12?.wasHCVReceivedBeforeAfter
      );
      setHcvTreatmentCVirus(onlyData?.section12?.hcvTreatmentCVirus);
      setHCVTreatedYear(onlyData?.section12?.hcvTreatedYear);
      setHcvViralLoadAfterTreatment(
        onlyData?.section12?.hcvViralLoadAfterTreatment
      );
      setHcvPostTreatment(onlyData?.section12?.hcvPostTreatment);
      setSustainedHcv(onlyData?.section12?.sustainedHCV);
      setYearSVRHCV(onlyData?.section12?.yearSVRHCV);
    }

    if (onlyData && onlyData?.section13) {
      setIsDateHBVDiagnosis(onlyData?.section13?.isDateHBVDiagnosis);
      setDateOfHBVBVirus(onlyData?.section13?.dateOfHBVBVirus);
      setIsHBViralBVirus(onlyData?.section13?.isHBViralBVirus);
      setHBVviralTimeOfHCCDiagnosis(
        onlyData?.section13?.HBVviralTimeOfHCCDiagnosis
      );
      setWasHBVReceivedBeforeAfter(
        onlyData?.section13?.wasHBVReceivedBeforeAfter
      );
      setHcvTreatmentBVirus(onlyData?.section13?.hcvTreatmentBVirus);
      setHbvViralLoadAfterTreatment(
        onlyData?.section13?.hbvViralLoadAfterTreatment
      );
      setHbvPostTreatment(onlyData?.section13?.hbvPostTreatment);
      setDateOfHBVTreatmentYear(onlyData?.section13?.dateOfHBVTreatmentYear);
    }

    if (onlyData && onlyData?.section14) {
      setCreatedBy(onlyData?.section14?.createdBy);
      setCreatedOn(onlyData?.section14?.createdOn);
      setChangedBy(onlyData?.section14?.changedBy);
      setChangedOn(onlyData?.section14?.changedOn);
    }

    if (onlyData && onlyData?.comments) {
      // setCommentTxt(onlyData?.comments.comment);
      if (typeof onlyData?.comments === 'object' && typeof onlyData?.comments?.comment !== 'string')
        setCommentsData(onlyData?.comments);
    }
  }, [onlyData]);
  // // console.log(onlyData);
  const [studyButton, setStudyButton] = useState(true);
  const studyButtonHandle = () => {
    setStudyButton(!studyButton);
  };
  const [studyTitle, setStudyTitle] = useState("");
  // // console.log(studyTitle);
  const [projectNo, setProjectNo] = useState("");
  const [siteId, setSiteId] = useState("");
  const [studyDate, setStudyDate] = useState(getFormattedDate(new Date()));

  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  // const handleStudyDate = (date) => {
  //   setStudyDate(date);
  //   if (date) {
  //     setStudyDate(moment(date).format("DD-MMM-YYYY"));
  //   } else {
  //     setStudyDate(null);
  //   }
  // };
  //   subjectData initialization
  const [subjectButton, setSubjectButton] = useState(true);
  const subjectButtonHandle = () => {
    setSubjectButton(!subjectButton);
  };
  const [subjectId, setSubjectId] = useState("");
  const [subjectCounter, setSubjectCounter] = useState("");
  const [subjectYear, setSubjectYear] = useState("");
  const [subjectUnknown, setSubjectUnknown] = useState([]);
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

  // const [ethnicity, setEthnicity] = useState();

  // const handleOther = (e) => {
  //   setOtherCheck(!otherCheck);
  //   if (otherCheck === false) {
  //     setSubjectOtherText("");
  //   }
  // };

  useEffect(() => {
    getStudyPreDetails();
    const token = Cookies.get('tkn');
    if (token) {
      const data = jwtDecode(token);
      // console.log('dataaa', data);
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
  const [dateOfHcc, setDateOfHcc] = useState("");
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
  const [bmiBaseLine, setBmiBaseLine] = useState("");
  const [insuranceValue, setInsuranceValue] = useState("");
  const [insuraceValueOtherBaseline, setInsuranceValueOtherBaseline] =
    useState("");
  const [insuraceDetailsBaseLine, setInsuranceDetailsBaseLine] = useState("");
  const baseLineCharacterButtonHandle = () => {
    setBaseLineButton(!baseLineButton);
  };

  // const handleDateOfHcc = (date) => {
  //   const dateCurrent = moment(date).format("DD-MMM-YYYY");
  //   setDateOfHcc(dateCurrent);
  // };
  // // console.log(
  //   dateOfHcc,
  //   baseLineIfDate,
  //   baseLineAgeOfHcc,
  //   baseLineHeight,
  //   weightHggBaseLine,
  //   bmiBaseLine,
  //   insuranceValue,
  //   insuraceValueOtherBaseline,
  //   insuraceDetailsBaseLine
  // );
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
  const role = Cookies.get("role");
  let dispatchedTo;
  const sendRole = (dispatch) => {
    dispatchedTo = dispatch;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const filteredData = filterData(auditData);
    // console.log(filteredData);
    // return false;
    const token = Cookies.get('tkn');
    if (!token) {
      navigate('/login');
    }
    const tokenVal = jwtDecode(token);
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

    fetch(`${apiUrl}/eCRF-rest-service/updateRecord`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: formID,
        createDate: onlyData.createDate,
        status: `at ${dispatchedTo}`,
        dispatchDate: formattedDate,
        dispatchedFrom: role,
        dispatchedTo,
        subjectId: subjectId,
        siteId: siteId,
        comments: commentsData,
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
          createdOn,
          changedBy: tokenVal?.sub,
          changedOn: new Date()
        }
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (dispatchedTo === 'ROLE_REVIEWER')
          alert("Record Sent to Reviewer successfully");
        else if (dispatchedTo === 'ROLE_DATAENTRY')
          alert("Record sent back to Data entry user  Successfully");
        else if (dispatchedTo === 'Completed')
          alert("Record Completely submitted successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
    if (auditData.length) postAuditDetails();
  };

  const filterData = (dataArray) => {
    const lastIndexMap = {};
    dataArray.forEach((item, index) => {
      lastIndexMap[item.fieldName] = index;
    });

    const filteredData = dataArray.filter((item, index) => {
      return lastIndexMap[item.fieldName] === index;
    });

    return filteredData;
  };

  const postAuditDetails = () => {
    const token = Cookies.get('tkn');
    if (!token) {
      navigate('/login');
    }

    const filteredData = filterData(auditData);
    let data = localStorage.getItem("ecrf_details");
    if (data) data = JSON.parse(data);

    let auditReq = {
      recordId: formID,
      subjectId: subjectId,
      siteId: siteId,
      role: Cookies.get("role") ? Cookies.get("role") : "",
      modifiedBy: data?.username,
      modifiedOn: moment().format('YYYY-MM-DD HH:mm:ss'),
      auditData: filteredData
    };
    fetch(`${apiUrl}/eCRF-rest-service/audit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(auditReq)
    }).then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
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
  const [modelEndStageTextArea, setModelEndStageTextArea] = useState("");
  const [meldScoreLab, setMeldScoreLab] = useState("");
  const [fib4Lab, setFIB4Lab] = useState("");
  const [astPlateletLab, setastPlateletLab] = useState("");
  const laboratoryButtonHandle = () => {
    setLaboratoryButton(!laboratoryButton);
  };
  // // console.log(
  //   modelEndStageLab,
  //   fib4Lab,
  //   astPlateletLab,
  //   alanineValue,
  //   alanineFrom,
  //   alanineTo,
  //   aspartateValue,
  //   aspartateFrom,
  //   aspartateTo,
  //   bilirubinValue,
  //   bilirubinFrom,
  //   bilirubinTo,
  //   alkalineValue,
  //   alkalineFrom,
  //   alkalineTo,
  //   albuminValue,
  //   albuminFrom,
  //   triglyceridesValue,
  //   triglyceridesFrom,
  //   triglyceridesTo,
  //   highDensityValue,
  //   highDenistyFrom,
  //   highDensityTo,
  //   lowDensityValue,
  //   lowDensityFrom,
  //   lowDensityTo
  // );
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
  // ---------------------

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

  // // console.log(
  //   yesLocationSiteValue,
  //   yesStageValue,
  //   yesYearOfDiagnosis,
  //   alcoholConsumptionValue,
  //   diagnosisInformationValue,
  //   largeTurmorValue,
  //   tPrimaryValue,
  //   nRegionalValue,
  //   mRegionalValue,
  //   anatomicStageTNM,
  //   tumorDiffValue,
  //   ecogperformace,
  //   tumorStageValue,
  //   typeOfVascular,
  //   microvascularInvasion,
  //   tumorWithinMilan,
  //   childPughClassfication,
  //   barcelonaClinic
  // );
  // HCC Diagnosis Information
  const [hccDiagnosisUp, setHccDiagnosisUp] = useState(true);

  const [diagnosisInformationValue, setDiagnosisInformationValue] =
    useState([]);
  const [hccDiagnosisInfoValueOtherSpecify, sethccDiagnosisInfo] = useState("");
  const [typeOfImagine, setTypeOfImagine] = useState("");
  const [typeOfImagineText, setTypeOfImagineText] = useState("");
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

  // // console.log(
  //   fattyLiverCLD,
  //   cirrhosisStatusValue,
  //   mittalCriteriaValue,
  //   underlyingEtiologyValue,
  //   etiologyCirrhosisFreeValue,
  //   complicationCLD,
  //   hccOutcomeValue,
  //   resectionPerformed,
  //   liverTransplantValue,
  //   recurrenceValue,
  //   selectedDateOfFirstRecurrence,
  //   survivalStatusValue,
  //   selectedDateOfDeath,
  //   selectedDateOfLastContact,
  //   selectedDateOfRecurrenceFree,
  //   selectedDateOfOverallSurvival,
  //   screeningQuestion,

  //   screeningQuestionNa
  // );
  //HIV Specific initializer
  const [hivSpecificButton, setHivSpecific] = useState(true);
  const [historyHIV, setHistoryHiv] = useState("");
  const [yearOfHIVHCC, setYearOfHIVHCC] = useState("");
  const [dateOfHIVDurationFrom, setDateOfHIVDurationFrom] = useState("");
  const [dateOfHIVDurationTo, setDateOfHIVDurationTo] = useState("");
  const [belowRadioHCC, setBelowRadioHCC] = useState([]);
  const [belowLimitDefect, setBelowLimitDefect] = useState("");
  const [hivRNAHCC, setHIVRNAHCC] = useState("");
  const [hivCD4, setHIVCD4] = useState("");
  const [hivAbsoluteCD4, setHivAbsoluteCD4] = useState("");
  const [hivCD4CellCount, setHIVCD4CellCount] = useState("");
  const [hivInitialHIV1, setHivInitialHIV1] = useState("");
  const [maximumHIVRNA, setMaximumHIVRNA] = useState("");

  const [hivCD4Nav, setHIVCD4Nav] = useState("");
  const [hivAbsoluteCD4Nav, setHivAbsoluteCD4Nav] = useState("");
  const [hivCD4CellCountNav, setHIVCD4CellCountNav] = useState("");
  const [hivInitialHIV1Nav, setHivInitialHIV1Nav] = useState("");
  const [maximumHIVRNANav, setMaximumHIVRNANav] = useState("");
  // const handleDateOfHIVDuration = (date) => {
  //   setDateOfHIVDuration(moment(date).format("DD-MMM-YYYY"));
  // };
  const hivButtonHandle = () => {
    setHivSpecific(!hivSpecificButton);
  };
  // // console.log(
  //   historyHIV,
  //   yearOfHIVHCC,
  //   dateOfHIVDurationFrom,
  //   dateOfHIVDurationTo,
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
  // const handleYearSVRHCV = (date) => {
  //   setYearSVRHCV(moment(date).format("DD-MMM-YYYY"));
  // };

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

  //   log initializer
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
        // setCreatedBy(data?.sub);
        // setChangedBy(data?.sub);
        // setCreatedOn(formatDate(new Date()));
        setChangedOn(new Date());
      }
    }
  }, []);
  const logUpHandle = () => {
    setLogUp(!logUp);
  };
  // const handleDateOfHBVBVirus = (date) => {
  //   setDateOfHBVBVirus(moment(date).format("DD-MMM-YYYY"));
  // };
  // const handleDateOfHBVTreatmentYear = (date) => {
  //   setDateOfHBVTreatmentYear(moment(date).format("DD-MMM-YYYY"));
  // };
  // // console.log(
  //   dateOfHBVBVirus,
  //   isDateHBVDiagnosis,
  //   isHBViralBVirus,
  //   HBVviralTimeOfHCCDiagnosis,
  //   wasHBVReceivedBeforeAfter,
  //   hcvTreatmentBVirus,
  //   hbvViralLoadAfterTreatment,
  //   hbvPostTreatment,
  //   dateOfHBVTreatmentYear
  // );

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

  const getAuditOldValue = (data) => {
    if (data.id === 15) return onlyData['comments'] && onlyData['comments']['comment'];
    else return onlyData[`section${data.id}`][data.fControlName];
  };

  const getComments = (data) => {
    return commentsData[`section${data.id}`][data.fControlName];
  }

  const handleAuditDetails = async (data) => {
    if (data.id === 15) {
      let aData = {
        fieldName: data.fControlName,
        labelName: data.fName,
        sectionName: data.name,
        newValue: data.value,
        oldValue: getAuditOldValue(data),
        comment: getComments(data)
      };
      setAuditData(prevAuditData => [...prevAuditData, aData]);
    } else {
      const oldVal = getAuditOldValue(data);
      if (oldVal !== data.value) {
        let aData = {
          fieldName: data.fControlName,
          labelName: data.fName,
          sectionName: data.name,
          newValue: data.value,
          oldValue: oldVal,
          comment: getComments(data)
        };
        setAuditData(prevAuditData => [...prevAuditData, aData]);
      } else {
        const aData = auditData.filter(item => item.fControlName !== data.fControlName);
        setAuditData(aData);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTmpComment("");
  };

  const handleComments = ({ e, fControlName, value, section }) => {
    e.preventDefault();
    console.log(fControlName, value, section);
    setCommentFCName(fControlName);
    setCommentValue(value);
    setCommentSection(section);
    setShowModal(true);
    try {
      // if(fControlName !)
      setTmpComment(commentsData[section][fControlName] || "");
    }
    catch (e) {
      console.log(e);
    }
  };

  const updateComments = async () => {
    const section = sectionDetails.find(section => section.key === commentSection);

    setCommentsData(currentState => ({
      ...currentState,
      [commentSection]: {
        ...currentState[commentSection],
        [commentFCName]: tmpComment
      }
    }));
    setTmpComment("");

    const newAuditData = auditData.slice();
    const auditEntry = {
      fieldName: commentFCName,
      labelName: commentFCName,
      sectionName: section ? section.value : '',
      newValue: commentValue,
      oldValue: onlyData[commentSection][commentFCName],
      comment: tmpComment
    };
    newAuditData.push(auditEntry);
    setAuditData(newAuditData);

    /*if (auditData.length) {
      for (let i = 0; i < auditData.length; i++) {
        if (auditData[i].fieldName === commentFCName) {
          setAuditData(prevAuditData => [...prevAuditData, {
            fieldName: commentFCName,
            labelName: commentFCName,
            sectionName: section ? section.value : '',
            newValue: commentValue,
            oldValue: onlyData[commentSection][commentFCName],
            comment: tmpComment
          }]);
        } else {
          let aData = {
            fieldName: commentFCName,
            labelName: commentFCName,
            sectionName: section ? section.value : '',
            newValue: commentValue,
            oldValue: onlyData[commentSection][commentFCName],
            comment: tmpComment
          };
          setAuditData(prevAuditData => [...prevAuditData, aData]);
        }
      }
    } else {
      let aData = {
        fieldName: commentFCName,
        labelName: commentFCName,
        sectionName: section ? section.value : '',
        newValue: commentValue,
        oldValue: onlyData[commentSection][commentFCName],
        comment: tmpComment
      };
      setAuditData(prevAuditData => [...prevAuditData, aData]);
    }*/
    handleClose();
  }

  const isCommentExist = (section, fName) => {
    try {
      if (fName === 'meldScoreLab' && commentsData[section][fName] === 0) {
        return false;
      }
      return commentsData[section][fName] !== "" ? true : false;
    } catch (e) {

    }
  }

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
                {studyButton ? <ArrowDownward /> : <ArrowUpward />}
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
                        onBlur={() => handleAuditDetails({ id: 1, name: 'Study Data', fName: 'Study Title', fControlName: 'studyTitle', value: studyTitle })}
                        type="text"
                        disabled
                      ></textarea>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-sm-4">
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
                        onBlur={() => handleAuditDetails({ id: 1, name: 'Study Data', fName: 'Project No', fControlName: 'projectNo', value: projectNo })}
                        type="text"
                        disabled
                      />
                      {/* <Form.Select required onChange={(e) => setProjectNo(e.target.value)} disabled={role === "ROLE_REVIEWER"}
                        onBlur={() => handleAuditDetails({ id: 1, name: 'Study Data', fName: 'Project No', fControlName: 'projectNo', value: projectNo })}>
                        {studyProjects && studyProjects.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select> */}
                    </div>
                    <div className="col-sm-4">
                      <label className="label-txt" htmlFor="study-title">
                        Study Date
                        <button type="btn btn-primary" className={isCommentExist('section1', 'studyDate') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'studyDate', value: studyDate, section: 'section1' })}></button>
                      </label>
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        className="form-control"
                        value={studyDate}
                        onBlur={() => handleAuditDetails({ id: 1, name: 'Study Data', fName: 'Study Date', fControlName: 'studyDate', value: studyDate })}
                        disabled={role === "ROLE_REVIEWER"}
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
                        onBlur={() => handleAuditDetails({ id: 1, name: 'Study Data', fName: 'Study Date', fControlName: 'studyDate', value: studyDate })}
                        disabled={role === "ROLE_REVIEWER"}
                        onBl
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
                        value={siteId}
                        onChange={(e) => setSiteId(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 1, name: 'Study Data', fName: 'Site ID / Name', fControlName: 'siteId', value: siteId })}
                        disabled
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
                    disabled={role === "ROLE_REVIEWER"}
                    value={studyTitle}
                    onChange={(e) => setStudyTitle(e.target.value)}
                    onBlur={() => handleAuditDetails({ id: 1, name: 'Study Data', fName: 'Study Title', fControlName: 'studyTitle', value: studyTitle })}
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
onKeyDown={handleKeyPress}
                      disabled={role === "ROLE_REVIEWER"}
                      maxLength={10}
                      value={projectNo}
                      onChange={(e) => setProjectNo(e.target.value)}
                      onBlur={() => handleAuditDetails({ id: 1, name: 'Study Data', fName: 'Project No', fControlName: 'projectNo', value: projectNo })}
                      id="project-no"
                      className="input-width"
                      type="text"
                    />
                  </div>

                  <div className="container-width">
                    <input
onKeyDown={handleKeyPress}
                      className="input-width"
                      value={studyDate}
                      disabled={role === "ROLE_REVIEWER"}
                      onChange={(e) => setStudyDate(e.target.value)}
                      onBlur={() => handleAuditDetails({ id: 1, name: 'Study Data', fName: 'Study Date', fControlName: 'studyDate', value: studyDate })}
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
                      disabled={role === "ROLE_REVIEWER"}
                      maxLength={3}
                      value={siteId}
                      onChange={(e) => setSiteId(e.target.value)}
                      onBlur={() => handleAuditDetails({ id: 1, name: 'Study Data', fName: 'Site ID / Name', fControlName: 'siteId', value: siteId })}
                      id="site-id"
                      className="input-width"
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
                  {subjectButton ? <ArrowDownward /> : <ArrowUpward />}
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
                          onChange={(e) => setSubjectId(e.target.value)}
                          readOnly
                          disabled
                          onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Subject ID', fControlName: 'subjectId', value: subjectId })}
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
                          onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Subject Counter', fControlName: 'subjectCounter', value: subjectCounter })}
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
                          <button type="btn btn-primary" className={isCommentExist('section2', 'subjectYear') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'subjectYear', value: subjectYear, section: 'section2' })}></button>
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          required={subjectUnknown === true}
                          disabled={
                            (subjectUnknown && subjectUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                          }
                          placeholder="YYYY"
                          type="text"
                          //   min={1900}
                          //   max={2024}
                          value={subjectYear}
                          className="form-control"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setSubjectYear(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Year of Birth (if available)', fControlName: 'subjectYear', value: subjectYear })}
                        />
                      </div>
                      <div className="col-sm-2">
                        <label className="label-txt" htmlFor="subject-counter" style={{ marginLeft: 35, marginTop: 35 }}>
                          OR
                        </label>
                      </div>
                      <div className="col-sm-3">
                        {/* <label>
                        <button type="btn btn-primary" className={isCommentExist('section1', 'studyDate') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'studyDate', value: studyDate, section: 'section1' })}></button>
                        </label> */}
                        <Form.Check
                          type="checkbox"
                          // style={{ marginTop: 35 }}
                          label="Unknown"
                          disabled={role === "ROLE_REVIEWER"}
                          onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Unknown', fControlName: 'subjectUnknown', value: subjectUnknown })}
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
                          <button type="btn btn-primary" className={isCommentExist('section2', 'subjectGender') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'subjectGender', value: subjectGender, section: 'section2' })}></button>
                        </label>
                        <div style={{ display: 'inline-flex' }}>
                          <Form.Check
                            type="radio"
                            label="Male"
                            value={'Male'}
                            checked={subjectGender === "Male"}
                            onChange={(e) => setSubjectGender(e.target.value)}
                            disabled={role === "ROLE_REVIEWER"}
                            onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Gender', fControlName: 'subjectGender', value: subjectGender })}
                          />
                          <Form.Check
                            type="radio"
                            label="Female"
                            value={'Female'}
                            style={{ marginLeft: 5 }}
                            checked={subjectGender === "Female"}
                            onChange={(e) => setSubjectGender(e.target.value)}
                            disabled={role === "ROLE_REVIEWER"}
                            onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Gender', fControlName: 'subjectGender', value: subjectGender })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-7" style={{ marginTop: 20 }}>
                        <label className="label-txt" htmlFor="gender">
                          Ethnicity
                          <button type="btn btn-primary" className={isCommentExist('section2', 'otherCheck') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'otherCheck', value: otherCheck, section: 'section2' })}></button>
                        </label>
                        <div style={{ display: 'inline-flex', width: '100%' }}>
                          <div className="col-sm-3">
                            <Form.Check
                              type="radio"
                              label="Mexican"
                              value={'Mexican'}
                              checked={otherCheck === "Mexican"}
                              disabled={role === "ROLE_REVIEWER"}
                              onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Ethnicity', fControlName: 'otherCheck', value: otherCheck })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Ethnicity', fControlName: 'otherCheck', value: otherCheck })}
                            />
                          </div>
                          <div className="col-sm-6">
                            {
                              otherCheck === "Others" && (
                                <>
                                  <label>
                                    <button type="btn btn-primary" className={isCommentExist('section2', 'subjectOtherText') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'subjectOtherText', value: subjectOtherText, section: 'section2' })}></button>
                                  </label>
                                  <textarea
                                    onKeyDown={handleKeyPress}
                                    maxLength={15}
                                    rows={1}
                                    value={subjectOtherText}
                                    onChange={(e) => setSubjectOtherText(e.target.value)}
                                    onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Ethnicity Other check', fControlName: 'subjectOtherText', value: subjectOtherText })}
                                    disabled={
                                      otherCheck !== "Others" || role === "ROLE_REVIEWER"
                                    }
                                    className="form-control"
                                  ></textarea>
                                </>
                              )
                            }
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label className="label-txt">Place of Birth(City)
                          <button type="btn btn-primary" className={isCommentExist('section2', 'placeOfBirthCity') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'placeOfBirthCity', value: placeOfBirthCity, section: 'section2' })}></button></label>
                        <input
                          onKeyDown={handleKeyPress}
                          maxLength={30}
                          value={placeOfBirthCity}
                          onChange={(e) => setPlaceOfBirthCity(e.target.value)}
                          id="place-birth"
                          className="form-control"
                          type="text"
                          onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Place of birth City', fControlName: 'placeOfBirthCity', value: placeOfBirthCity })}
                          disabled={role === "ROLE_REVIEWER"}
                        />
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label className="label-txt">Place of Birth(State)
                          <button type="btn btn-primary" className={isCommentExist('section2', 'placeOfBirthState') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'placeOfBirthState', value: placeOfBirthState, section: 'section2' })}></button></label>
                        <input
                          onKeyDown={handleKeyPress}
                          maxLength={30}
                          onChange={(e) => setPlaceOfBirthState(e.target.value)}
                          value={placeOfBirthState}
                          id="place-birth"
                          className="form-control"
                          type="text"
                          disabled={role === "ROLE_REVIEWER"}
                          onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Place of birth State', fControlName: 'placeOfBirthState', value: placeOfBirthState })}
                        />
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label className="label-txt">
                          Residence City
                          <button type="btn btn-primary" className={isCommentExist('section2', 'residencyCity') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'residencyCity', value: residencyCity, section: 'section2' })}></button>
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          maxLength={30}
                          id="residency-city"
                          value={residencyCity}
                          onChange={(e) => setResidencyCity(e.target.value)}
                          className="form-control"
                          type="text"
                          onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Residence City', fControlName: 'residencyCity', value: residencyCity })}
                          disabled={role === "ROLE_REVIEWER"}
                        />
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label className="label-txt">
                          Residence State
                          <button type="btn btn-primary" className={isCommentExist('section2', 'residencyState') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'residencyState', value: residencyState, section: 'section2' })}></button>
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          maxLength={30}
                          onChange={(e) => setResidencyState(e.target.value)}
                          value={residencyState}
                          id="residency-state"
                          type="text"
                          className="form-control"
                          onBlur={() => handleAuditDetails({ id: 2, name: 'Subject Data', fName: 'Residence State', fControlName: 'residencyState', value: residencyState })}
                          disabled={role === "ROLE_REVIEWER"}
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
                  {baseLineButton ? <ArrowDownward /> : <ArrowUpward />}
                </button>
              </div>
              <div className={baseLineButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="row">
                      <div className="col-sm-3">
                        <label className="label-txt">Date of HCC Diagnosis
                          <button type="btn btn-primary" className={isCommentExist('section3', 'dateOfHcc') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'dateOfHcc', value: dateOfHcc, section: 'section3' })}></button></label>
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
                          onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Date of HCC Diagnosis', fControlName: 'dateOfHcc', value: dateOfHcc })}
                          disabled={
                            (baseLineIfDateRadio && baseLineIfDateRadio[0] === "Unknown") ||
                            role === "ROLE_REVIEWER"
                          }
                          className="form-control"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={dateOfHcc}
                          onChange={date => {
                            console.log(date);
                            const tmpDate = new Date(date).getFullYear() + '-' + new Date(date).getMonth() + '-' +
                            new Date(date).getDate();
                            setDateOfHcc(tmpDate);
                          }}
                          startDate={dateOfHcc}
                          dateFormat={'dd/MMM/yyyy'}
                          className="form-control date"
                          placeholderText="DD/MMM/YYYY"
                          onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Date of HCC Diagnosis', fControlName: 'dateOfHcc', value: dateOfHcc })}
                          disabled={
                            baseLineIfDateRadio[0] === "Unknown" ||
                            role === "ROLE_REVIEWER"
                          }
                        /> */}
                      </div>
                      <div className="col-sm-1">
                        <label className="label-txt" htmlFor="subject-counter" style={{ marginLeft: 35, marginTop: 35 }}>
                          OR
                        </label>
                      </div>
                      <div className="col-sm-3">
                        <button type="btn btn-primary" className={isCommentExist('section3', 'baseLineIfDateRadio') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'baseLineIfDateRadio', value: baseLineIfDateRadio, section: 'section3' })}></button>
                        <Form.Check
                          type="checkbox"
                          label="Date Not Available"
                          checked={baseLineIfDateRadio && baseLineIfDateRadio.includes("Unknown")}
                          onChange={() => handleBaseLineRadio("Unknown")}
                          style={{ marginLeft: 15, marginTop: 35 }}
                          onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Date of HCC Diagnosis Unknown', fControlName: 'baseLineIfDateRadio', value: baseLineIfDateRadio })}
                          disabled={role === "ROLE_REVIEWER"}
                        />
                      </div>
                      <div className="col-sm-5">
                        <label className="label-txt-baseLine">
                          If date not available, mention the approximate year
                          <button type="btn btn-primary" className={isCommentExist('section3', 'baseLineIfDate') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'baseLineIfDate', value: baseLineIfDate, section: 'section3' })}></button>
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={
                            (baseLineIfDateRadio && baseLineIfDateRadio[0] !== "Unknown") ||
                            role === "ROLE_REVIEWER"
                          }
                          value={baseLineIfDate}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setBaseLineIfDate(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Date of HCC Diagnosis Year', fControlName: 'baseLineIfDate', value: baseLineIfDate })}
                          className="form-control"
                          type="text"
                          placeholder="YYYY"
                          style={{ width: 150 }}
                        />
                      </div>
                      <div className="col-sm-4" style={{ marginTop: 20 }}>
                        <label className="label-txt">Age at HCC Diagnosis
                          <button type="btn btn-primary" className={isCommentExist('section3', 'baseLineAgeOfHcc') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'baseLineAgeOfHcc', value: baseLineAgeOfHcc, section: 'section3' })}></button></label>
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
                          disabled={role === "ROLE_REVIEWER"}
                          onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Age at HCC Diagnosis', fControlName: 'baseLineAgeOfHcc', value: baseLineAgeOfHcc })}
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
                          <label className="label-txt">Height(in cm)
                            <button type="btn btn-primary" className={isCommentExist('section3', 'baseLineHeight') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'baseLineHeight', value: baseLineHeight, section: 'section3' })}></button></label>
                          <input
                            onKeyDown={handleKeyPress}
                            placeholder="Height"
                            value={baseLineHeight}
                            onChange={(e) => {
                              const value = e.target.value;
                              const reg = /^\d{1,3}(\.\d{0,1})?$/;
                              if (reg.test(value) || value === "") {
                                setBaseLineHeight(e.target.value);
                              }
                            }}
                            disabled={role === "ROLE_REVIEWER"}
                            onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Height', fControlName: 'baseLineHeight', value: baseLineHeight })}
                            className="form-control"
                            type="text"
                            style={{ width: 150 }}
                          />
                        </div>
                        <div className="col-sm-7">
                          <label className="label-txt">
                            Weight in KG <span>(closest to the date of HCC diagnosis)
                              <button type="btn btn-primary" className={isCommentExist('section3', 'weightHggBaseLine') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'weightHggBaseLine', value: weightHggBaseLine, section: 'section3' })}></button>
                            </span>
                          </label>
                          <input
                            onKeyDown={handleKeyPress}
                            placeholder="Weight"
                            value={weightHggBaseLine}
                            onChange={(e) => {
                              const value = e.target.value;
                              const reg = /^\d{1,3}(\.\d{0,1})?$/;
                              if (reg.test(value) || value === "") {
                                setWeightHggBaseLine(e.target.value);
                              }
                            }}
                            disabled={role === "ROLE_REVIEWER"}
                            onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Weight', fControlName: 'weightHggBaseLine', value: weightHggBaseLine })}
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
                          <label className="label-txt">BMI in kg/m2
                            <button type="btn btn-primary" className={isCommentExist('section3', 'bmiBaseLine') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'bmiBaseLine', value: bmiBaseLine, section: 'section3' })}></button></label>
                          <input
                            onKeyDown={handleKeyPress}
                            placeholder="Enter the Body Mass Index"
                            value={bmiBaseLine}
                            readOnly
                            // onChange={(e) => setBmiBaseLine(e.target.value)}
                            className="form-control"
                            disabled={role === "ROLE_REVIEWER"}
                            onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Body Mass Index(BMI)', fControlName: 'bmiBaseLine', value: bmiBaseLine })}
                            type="number"
                          />
                        </div>
                      </div> */}
                      <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-6">
                          <label className="label-txt">Type of Insurance
                            <button type="btn btn-primary" className={isCommentExist('section3', 'insuranceValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'insuranceValue', value: insuranceValue, section: 'section3' })}></button></label>
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
                              disabled={role === "ROLE_REVIEWER"}
                              onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Type of Insurance', fControlName: 'insuranceValue', value: insuranceValue })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Type of Insurance', fControlName: 'insuranceValue', value: insuranceValue })}
                            />
                            <Form.Check
                              type="radio"
                              label="Other"
                              style={{ marginLeft: 5, marginRight: "5px" }}
                              checked={insuranceValue === "Other"}
                              value={"Other"}
                              onChange={(e) => setInsuranceValue(e.target.value)}
                              disabled={role === "ROLE_REVIEWER"}
                              onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Type of Insurance', fControlName: 'insuranceValue', value: insuranceValue })}
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
                                  onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Type of Insurance Other', fControlName: 'insuraceValueOtherBaseline', value: insuraceValueOtherBaseline })}
                                  disabled={
                                    insuranceValue !== "Other" || role === "ROLE_REVIEWER"
                                  }
                                  className="form-control"
                                ></textarea>
                              )
                            }
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <label className="label-txt">Insurance Details
                            <button type="btn btn-primary" className={isCommentExist('section3', 'insuraceDetailsBaseLine') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'insuraceDetailsBaseLine', value: insuraceDetailsBaseLine, section: 'section3' })}></button></label>
                          <textarea
                            onKeyDown={handleKeyPress}
                            disabled={!insuranceValue || role === "ROLE_REVIEWER"}
                            maxLength={200}
                            placeholder="Insurance Details"
                            rows={1}
                            value={insuraceDetailsBaseLine}
                            onChange={(e) =>
                              setInsuranceDetailsBaseLine(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 3, name: 'Baseline Characteristics', fName: 'Insurance Details', fControlName: 'insuraceDetailsBaseLine', value: insuraceDetailsBaseLine })}
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
                  {laboratoryButton ? <ArrowDownward /> : <ArrowUpward />}
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
                                  style={{ height: 'fit-content' }}
                                  disabled={
                                    (hemoGlobinUnknown && hemoGlobinUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Hemoglobin A1C (HbA1c) From', fControlName: 'hemoGlobinFrom', value: hemoGlobinFrom })}
                                  value={hemoGlobinFrom}
                                  onChange={(e) => setHemoGlobinFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'hemoGlobinFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hemoGlobinFrom', value: hemoGlobinFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={hemoGlobinTo}
                                  disabled={
                                    (hemoGlobinUnknown && hemoGlobinUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Hemoglobin A1C (HbA1c) To', fControlName: 'hemoGlobinTo', value: hemoGlobinTo })}
                                  onChange={(e) => setHemoGlobinTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'hemoGlobinTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hemoGlobinTo', value: hemoGlobinTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={hemoGlobinValue}
                                  disabled={
                                    (hemoGlobinUnknown && hemoGlobinUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setHemoglobinValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Hemoglobin A1C (HbA1c) Value', fControlName: 'hemoGlobinValue', value: hemoGlobinValue })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'hemoGlobinValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hemoGlobinValue', value: hemoGlobinValue, section: 'section4' })}></button>
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
                                  checked={hemoGlobinUnknown?.includes("Unknown")}
                                  onChange={() => handleglobin("Unknown")}
                                  disabled={role === "ROLE_REVIEWER"}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Hemoglobin A1C (HbA1c) Unknown', fControlName: 'hemoGlobinUnknown', value: hemoGlobinUnknown })}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="col-sm-5">Alanine Aminotransferase(ALT)</td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  id="alanine-from"
                                  style={{ height: 'fit-content' }}
                                  value={alanineFrom}
                                  disabled={
                                    (alanineUnknown && alanineUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Alanine Aminotransferase(ALT) From', fControlName: 'alanineFrom', value: alanineFrom })}
                                  onChange={(e) => setAlanineFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'alanineFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'alanineFrom', value: alanineFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  //required
                                  id="alaninie-to"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={alanineTo}
                                  disabled={
                                    (alanineUnknown && alanineUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Alanine Aminotransferase(ALT) To', fControlName: 'alanineTo', value: alanineTo })}
                                  onChange={(e) => setAlanineTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'alanineTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'alanineTo', value: alanineTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={alanineValue}
                                  disabled={
                                    (alanineUnknown && alanineUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => { handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Alanine Aminotransferase(ALT) Value', fControlName: 'alanineValue', value: alanineValue }); calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true) }}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setAlanineValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'alanineValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'alanineValue', value: alanineValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  label="Unknown"
                                  checked={alanineUnknown?.includes("Unknown")}
                                  onChange={() => handlealanine("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Alanine Aminotransferase(ALT) Unknown', fControlName: 'alanineUnknown', value: alanineUnknown })}
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
                                  disabled={
                                    (aspartateUnknown && aspartateUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setAspartateFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'AST From', fControlName: 'aspartateFrom', value: aspartateFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'aspartateFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'aspartateFrom', value: aspartateFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={aspartateTo}
                                  disabled={
                                    (aspartateUnknown && aspartateUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => { handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'AST To', fControlName: 'aspartateTo', value: aspartateTo }); calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true) }}
                                  onChange={(e) => setAspartateTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'aspartateTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'aspartateTo', value: aspartateTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={aspartateValue}
                                  disabled={
                                    (aspartateUnknown && aspartateUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setAspartateValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => { handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'AST Value', fControlName: 'aspartateValue', value: aspartateValue }); calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true) }}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'aspartateValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'aspartateValue', value: aspartateValue, section: 'section4' })}></button>
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
                                  checked={aspartateUnknown?.includes("Unknown")}
                                  onChange={() => handleaspartate("Unknown")}
                                  disabled={role === "ROLE_REVIEWER"}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'AST Unknown', fControlName: 'aspartateUnknown', value: aspartateUnknown })}
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
                                  disabled={
                                    (bilirubinUnknown && bilirubinUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setBilirubinFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Total Bilirubin From', fControlName: 'bilirubinFrom', value: bilirubinFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'bilirubinFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'bilirubinFrom', value: bilirubinFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={bilirubinTo}
                                  disabled={
                                    (bilirubinUnknown && bilirubinUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setBilirubinTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Total Bilirubin TO', fControlName: 'bilirubinTo', value: bilirubinTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'bilirubinTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'bilirubinTo', value: bilirubinTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={bilirubinValue}
                                  disabled={
                                    (bilirubinUnknown && bilirubinUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setBilirubinValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => { handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Total Bilirubin Value', fControlName: 'bilirubinValue', value: bilirubinValue }); calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true) }}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'bilirubinValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'bilirubinValue', value: bilirubinValue, section: 'section4' })}></button>
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
                                  checked={bilirubinUnknown?.includes("Unknown")}
                                  onChange={() => handlebilirubbin("Unknown")}
                                  disabled={role === "ROLE_REVIEWER"}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Total Bilirubin Unknown', fControlName: 'bilirubinUnknown', value: bilirubinUnknown })}
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
                                  disabled={
                                    (alkalineUnknown && alkalineUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setAlkalineFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'ALP From', fControlName: 'alkalineFrom', value: alkalineFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'alkalineFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'alkalineFrom', value: alkalineFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={alkalineTo}
                                  disabled={
                                    (alkalineUnknown && alkalineUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setAlkalineTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'ALP To', fControlName: 'alkalineTo', value: alkalineTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'alkalineTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'alkalineTo', value: alkalineTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={alkalineValue}
                                  disabled={
                                    (alkalineUnknown && alkalineUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setAlkalineValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'ALP Value', fControlName: 'alkalineValue', value: alkalineValue })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'alkalineValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'alkalineValue', value: alkalineValue, section: 'section4' })}></button>
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
                                  checked={alkalineUnknown?.includes("Unknown")}
                                  onChange={() => handlealkaline("Unknown")}
                                  disabled={role === "ROLE_REVIEWER"}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'ALP Unknown', fControlName: 'alkalineUnknown', value: alkalineUnknown })}
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
                                  disabled={
                                    (albuminUnknown && albuminUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Albumin From', fControlName: 'albuminFrom', value: albuminFrom })}
                                  onChange={(e) => setAlbuminFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'albuminFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'albuminFrom', value: albuminFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  value={albuminTo}
                                  disabled={
                                    (albuminUnknown && albuminUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Albumin To', fControlName: 'albuminTo', value: albuminTo })}
                                  onChange={(e) => setAlbuminTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'albuminTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'albuminTo', value: albuminTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={albuminValue}
                                  disabled={
                                    (albuminUnknown && albuminUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Albumin Value', fControlName: 'albuminValue', value: albuminValue })}
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
                                <button type="btn btn-primary" className={isCommentExist('section4', 'albuminValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'albuminValue', value: albuminValue, section: 'section4' })}></button>
                                <p className="alert">
                                  {(parseFloat(albuminValue) <
                                    parseFloat(albuminFrom) ||
                                    parseFloat(albuminValue) > parseFloat(albuminTo)) &&
                                    "Not in between the range"}
                                </p>
                              </td>
                              <td>
                                g/dl
                              </td>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  disabled={role === "ROLE_REVIEWER"}
                                  label="Unknown"
                                  checked={albuminUnknown?.includes("Unknown")}
                                  onChange={() => handlealbumin("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Albumin Unknown', fControlName: 'albuminUnknown', value: albuminUnknown })}
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
                                  disabled={
                                    (platelatesUnknown && platelatesUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Platelets From', fControlName: 'platelatesFrom', value: platelatesFrom })}
                                  onChange={(e) => setPlatelatesFrom(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'platelatesFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'platelatesFrom', value: platelatesFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  value={platelatesTo}
                                  disabled={
                                    (platelatesUnknown && platelatesUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Platelets To', fControlName: 'platelatesTo', value: platelatesTo })}
                                  onChange={(e) => setPlatelatesTo(e.target.value)}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'platelatesTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'platelatesTo', value: platelatesTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  // style={{ marginLeft: 10, height: 'fit-content' }}
                                  value={platelatesValue}
                                  disabled={
                                    (platelatesUnknown && platelatesUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onBlur={() => { handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Platelets Value', fControlName: 'platelatesValue', value: platelatesValue }); calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true) }}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setPlatelatesValue(e.target.value);
                                    }
                                  }}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'platelatesValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'platelatesValue', value: platelatesValue, section: 'section4' })}></button>
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
                                  checked={platelatesUnknown?.includes("Unknown")}
                                  onChange={() => handleplatelates("Unknown")}
                                  disabled={role === "ROLE_REVIEWER"}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Platelets Unknown', fControlName: 'platelatesUnknown', value: platelatesUnknown })}
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
                                  disabled={
                                    (creatinineUnknown && creatinineUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setCreatinineFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Creatinine From', fControlName: 'creatinineFrom', value: creatinineFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'creatinineFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'creatinineFrom', value: creatinineFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  value={creatinineTo}
                                  disabled={
                                    (creatinineUnknown && creatinineUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setCreatinineTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Creatinine To', fControlName: 'creatinineTo', value: creatinineTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'creatinineTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'creatinineTo', value: creatinineTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={creatinineValue}
                                  disabled={
                                    (creatinineUnknown && creatinineUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setCreatinineValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => { handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Creatinine Value', fControlName: 'creatinineValue', value: creatinineValue }); calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true) }}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'creatinineValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'creatinineValue', value: creatinineValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  checked={creatinineUnknown?.includes("Unknown")}
                                  onChange={() => handlecreatinine("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Creatinine Unknown', fControlName: 'creatinineUnknown', value: creatinineUnknown })}
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
                                  disabled={
                                    (prothrombinUnknown && prothrombinUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setProthrombinFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'PT From', fControlName: 'prothrombinFrom', value: prothrombinFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'prothrombinFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'prothrombinFrom', value: prothrombinFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alaninie-to"
                                  value={prothrombinTo}
                                  disabled={
                                    (prothrombinUnknown && prothrombinUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setProthrombinTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'PT To', fControlName: 'prothrombinTo', value: prothrombinTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'prothrombinTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'prothrombinTo', value: prothrombinTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={prothrombinValue}
                                  disabled={
                                    (prothrombinUnknown && prothrombinUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setProthrombinValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'PT Value', fControlName: 'prothrombinValue', value: prothrombinValue })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'prothrombinValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'prothrombinValue', value: prothrombinValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  checked={prothrombinUnknown?.includes("Unknown")}
                                  onChange={() => handleprothrobin("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'PT Unknown', fControlName: 'prothrombinUnknown', value: prothrombinUnknown })}
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
                                  disabled={
                                    (internationalUnknown && internationalUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setInternationalFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'INR From', fControlName: 'internationalFrom', value: internationalFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'internationalFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'internationalFrom', value: internationalFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={internationalTo}
                                  disabled={
                                    (internationalUnknown && internationalUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setinternationalTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'INR To', fControlName: 'internationalTo', value: internationalTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'internationalTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'internationalTo', value: internationalTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={internationalValue}
                                  disabled={
                                    (internationalUnknown && internationalUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setInternationalValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => { handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'INR Value', fControlName: 'internationalValue', value: internationalValue }); calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true) }}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'internationalValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'internationalValue', value: internationalValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  checked={internationalUnknown?.includes("Unknown")}
                                  onChange={() => handleinternational("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'INR Unknown', fControlName: 'internationalUnknown', value: internationalUnknown })}
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
                                  disabled={
                                    (alphaUnknown && alphaUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setAlphaFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'AFP From', fControlName: 'alphaFrom', value: alphaFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'alphaFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'alphaFrom', value: alphaFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={alphaTo}
                                  disabled={
                                    (alphaUnknown && alphaUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setAlphaTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'AFP To', fControlName: 'alphaTo', value: alphaTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'alphaTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'alphaTo', value: alphaTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={alphaValue}
                                  disabled={
                                    (alphaUnknown && alphaUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setAlphaValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'AFP Value', fControlName: 'alphaValue', value: alphaValue })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'alphaValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'alphaValue', value: alphaValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  checked={alphaUnknown?.includes("Unknown")}
                                  onChange={() => handlealpha("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'AFP Unknown', fControlName: 'alphaUnknown', value: alphaUnknown })}
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
                                  disabled={
                                    (sodiumUnknown && sodiumUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setSodiumFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Sodium From', fControlName: 'sodiumFrom', value: sodiumFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'sodiumFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'sodiumFrom', value: sodiumFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={sodiumTo}
                                  disabled={
                                    (sodiumUnknown && sodiumUnknown[0] === "Unknown") || role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setSodiumTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Sodium To', fControlName: 'sodiumTo', value: sodiumTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'sodiumTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'sodiumTo', value: sodiumTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={sodiumValue}
                                  disabled={
                                    (sodiumUnknown && sodiumUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setSodiumValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => { handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Sodium Value', fControlName: 'sodiumValue', value: sodiumValue }); calculatedScores('NA', modelEndStageLab === 'Not applicable' ? false : true) }}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'sodiumValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'sodiumValue', value: sodiumValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  checked={sodiumUnknown?.includes("Unknown")}
                                  onChange={() => handlesodium("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Sodium Unknown', fControlName: 'sodiumUnknown', value: sodiumUnknown })}
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
                                  disabled={
                                    (bloodUreaUnknown && bloodUreaUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setBloodUreaFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Blood Urea Nitrogen From', fControlName: 'bloodUreaFrom', value: bloodUreaFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'bloodUreaFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'bloodUreaFrom', value: bloodUreaFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={bloodUreaTo}
                                  disabled={
                                    (bloodUreaUnknown && bloodUreaUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setBloodUreaTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Blood Urea Nitrogen To', fControlName: 'bloodUreaTo', value: bloodUreaTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'bloodUreaTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'bloodUreaTo', value: bloodUreaTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={bloodUreaValue}
                                  disabled={
                                    (bloodUreaUnknown && bloodUreaUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setBloodUreaValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Blood Urea Nitrogen Value', fControlName: 'bloodUreaValue', value: bloodUreaValue })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'bloodUreaValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'bloodUreaValue', value: bloodUreaValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  checked={bloodUreaUnknown?.includes("Unknown")}
                                  onChange={() => handlebloodurea("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Blood Urea Nitrogen Unknown', fControlName: 'bloodUreaUnknown', value: bloodUreaUnknown })}
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
                                  disabled={
                                    (cholesterolUnknown && cholesterolUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setCholesterolFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Cholesterol From', fControlName: 'cholesterolFrom', value: cholesterolFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'cholesterolFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'cholesterolFrom', value: cholesterolFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={cholesterolTo}
                                  disabled={
                                    (cholesterolUnknown && cholesterolUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setCholesterolTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Cholesterol To', fControlName: 'cholesterolTo', value: cholesterolTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'cholesterolTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'cholesterolTo', value: cholesterolTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={cholesterolValue}
                                  disabled={
                                    (cholesterolUnknown && cholesterolUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setCholesterolValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Cholesterol Value', fControlName: 'cholesterolValue', value: cholesterolValue })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'cholesterolValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'cholesterolValue', value: cholesterolValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  checked={cholesterolUnknown?.includes("Unknown")}
                                  onChange={() => handlecholesterol("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Cholesterol Unknown', fControlName: 'cholesterolUnknown', value: cholesterolUnknown })}
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
                                  disabled={
                                    (triglyceridesUnknown && triglyceridesUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setTriglyceridesFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Triglycerides From', fControlName: 'triglyceridesFrom', value: triglyceridesFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'triglyceridesFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'triglyceridesFrom', value: triglyceridesFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={triglyceridesTo}
                                  disabled={
                                    (triglyceridesUnknown && triglyceridesUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setTriglyceridesTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Triglycerides To', fControlName: 'triglyceridesTo', value: triglyceridesTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'triglyceridesTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'triglyceridesTo', value: triglyceridesTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={triglyceridesValue}
                                  disabled={
                                    (triglyceridesUnknown && triglyceridesUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setTriglyceridesValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Triglycerides Value', fControlName: 'triglyceridesValue', value: triglyceridesValue })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'triglyceridesValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'triglyceridesValue', value: triglyceridesValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  checked={triglyceridesUnknown?.includes("Unknown")}
                                  onChange={() => handletriglycerides("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Triglycerides Unknown', fControlName: 'triglyceridesUnknown', value: triglyceridesUnknown })}
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
                                  disabled={
                                    (highDensityUnknown && highDensityUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setHighDenistyFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'HDL From', fControlName: 'highDenistyFrom', value: highDenistyFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'highDenistyFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'highDenistyFrom', value: highDenistyFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={highDensityTo}
                                  disabled={
                                    (highDensityUnknown && highDensityUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setHighDensityTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'HDL To', fControlName: 'highDensityTo', value: highDensityTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'highDensityTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'highDensityTo', value: highDensityTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={highDensityValue}
                                  disabled={
                                    (highDensityUnknown && highDensityUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setHighDensityValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'HDL Value', fControlName: 'highDensityValue', value: highDensityValue })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'highDensityValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'highDensityValue', value: highDensityValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  checked={highDensityUnknown?.includes("Unknown")}
                                  onChange={() => handlehighdensity("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'HDL Unknown', fControlName: 'highDensityUnknown', value: highDensityUnknown })}
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
                                  disabled={
                                    (lowDensityUnknown && lowDensityUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setLowDensityFrom(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'LDL From', fControlName: 'lowDensityFrom', value: lowDensityFrom })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'lowDensityFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'lowDensityFrom', value: lowDensityFrom, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="internationalTo"
                                  value={lowDensityTo}
                                  disabled={
                                    (lowDensityUnknown && lowDensityUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => setLowDensityTo(e.target.value)}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'LDL To', fControlName: 'lowDensityTo', value: lowDensityTo })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'lowDensityTo') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'lowDensityTo', value: lowDensityTo, section: 'section4' })}></button>
                              </td>
                              <td className="col-sm-1">
                                <input
                                  onKeyDown={handleKeyPress}
                                  required
                                  id="alanine-lab"
                                  value={lowDensityValue}
                                  disabled={
                                    (lowDensityUnknown && lowDensityUnknown[0] === "Unknown") ||
                                    role === "ROLE_REVIEWER"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /^[0-9.]*$/;
                                    if (reg.test(value) || value === "") {
                                      setLowDensityValue(e.target.value);
                                    }
                                  }}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'LDL Value', fControlName: 'lowDensityValue', value: lowDensityValue })}
                                  type="text"
                                  className="form-control"
                                />
                                <button type="btn btn-primary" className={isCommentExist('section4', 'lowDensityValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'lowDensityValue', value: lowDensityValue, section: 'section4' })}></button>
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
                                  disabled={role === "ROLE_REVIEWER"}
                                  checked={lowDensityUnknown?.includes("Unknown")}
                                  onChange={() => handlelowdensity("Unknown")}
                                  onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'LDL Unknown', fControlName: 'lowDensityUnknown', value: lowDensityUnknown })}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-sm-12">
                        <label htmlFor="alanine-lab" className="label-txt">
                          Model for End Stage Liver Disease (MELD)Na score for Cirrhosis Patient
                          <button type="btn btn-primary" className={isCommentExist('section4', 'modelEndStageLab') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'modelEndStageLab', value: modelEndStageLab, section: 'section4' })}></button>
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
                                calculatedScores(e.target.value);
                              }}
                              disabled={role === "ROLE_REVIEWER"}
                              onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Model for End Stage Liver Disease (MELD)', fControlName: 'modelEndStageLab', value: modelEndStageLab })}
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
                                setModelEndStageLab(s);
                                calculatedScores(e.target.value);
                              }}
                              disabled={role === "ROLE_REVIEWER"}
                              onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Model for End Stage Liver Disease (MELD) Not Applicable', fControlName: 'modelEndStageLab', value: modelEndStageLab })}
                            />
                          </div>
                          <div className="col-sm-6" style={{ display: 'inline-flex' }}>
                            <label htmlFor="alanine-lab" className="label-txt" style={{ marginLeft: 5 }}>
                              If applicable, SCORE
                              <button type="btn btn-primary" className={isCommentExist('section4', 'modelEndStageTextArea') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'modelEndStageTextArea', value: modelEndStageTextArea, section: 'section4' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'Model for End Stage Liver Disease (MELD) Score', fControlName: 'modelEndStageTextArea', value: modelEndStageTextArea })}
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
                          <button type="btn btn-primary" className={isCommentExist('section4', 'meldScoreLab') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'meldScoreLab', value: meldScoreLab, section: 'section4' })}></button>
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
                          onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'MELD Score', fControlName: 'meldScoreLab', value: meldScoreLab })}
                          className="form-control"
                          style={{ width: 150 }}
                        />
                      </div>
                      <div className="col-sm-3" style={{ marginTop: 20 }}>
                        <label htmlFor="FIB4-lab" className="label-txt">
                          FIB4
                          <button type="btn btn-primary" className={isCommentExist('section4', 'fib4Lab') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'fib4Lab', value: fib4Lab, section: 'section4' })}></button>
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
                          onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'FIB4', fControlName: 'fib4Lab', value: fib4Lab })}
                          className="form-control"
                          style={{ width: 150 }}
                        />
                      </div>
                      <div className="col-sm-6" style={{ marginTop: 20 }}>
                        <label htmlFor="ast-platelet-lab" className="label-txt">
                          AST to Platelet Ratio Index (APRI)
                          <button type="btn btn-primary" className={isCommentExist('section4', 'astPlateletLab') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'astPlateletLab', value: astPlateletLab, section: 'section4' })}></button>
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
                          onBlur={() => handleAuditDetails({ id: 4, name: 'Laboratory Parameters', fName: 'APRI', fControlName: 'astPlateletLab', value: astPlateletLab })}
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
                  {comorbiditiesButton ? <ArrowDownward /> : <ArrowUpward />}
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
                            <button type="btn btn-primary" className={isCommentExist('section5', 'diabetesComorbidities') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'diabetesComorbidities', value: diabetesComorbidities, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Diabetes', fControlName: 'diabetesComorbidities', value: diabetesComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Diabetes', fControlName: 'diabetesComorbidities', value: diabetesComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Diabetes', fControlName: 'diabetesComorbidities', value: diabetesComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
                              name="comorbidities-diabetes"
                              type="radio"
                            />
                          </td>
                          <td className="col-sm-4">
                            <div>
                              <label>Prior to</label>
                              <input
                                onKeyDown={handleKeyPress}
                                disabled={
                                  diabetesComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={diabetesAfter === "Prior to"}
                                value={"Prior to"}
                                onChange={(e) => setDiabetesAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Diabetes Prior To', fControlName: 'diabetesAfter', value: diabetesAfter })}
                                type="radio"
                                name="diabetes-yes"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                disabled={
                                  diabetesComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={diabetesAfter === "After"}
                                value={"After"}
                                onChange={(e) => setDiabetesAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Diabetes After', fControlName: 'diabetesAfter', value: diabetesAfter })}
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
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Diabetes NAV', fControlName: 'diabetesAfter', value: diabetesAfter })}
                                value={"NAV"}
                                disabled={
                                  diabetesComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                type="radio"
                                className="mL5"
                              />
                              <button type="btn btn-primary" className={isCommentExist('section5', 'diabetesAfter') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'diabetesAfter', value: diabetesAfter, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Diabetes input', fControlName: 'yesDiabetesInput', value: yesDiabetesInput })}
                              disabled={
                                diabetesComorbidities !== "Yes" ||
                                role === "ROLE_REVIEWER"
                              }
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                            <button type="btn btn-primary" className={isCommentExist('section5', 'yesDiabetesInput') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yesDiabetesInput', value: yesDiabetesInput, section: 'section5' })}></button>
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            Hypertension
                            <button type="btn btn-primary" className={isCommentExist('section5', 'hypertensionComorbidities') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hypertensionComorbidities', value: hypertensionComorbidities, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Hypertension', fControlName: 'hypertensionComorbidities', value: hypertensionComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Hypertension', fControlName: 'hypertensionComorbidities', value: hypertensionComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Hypertension', fControlName: 'hypertensionComorbidities', value: hypertensionComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                                disabled={
                                  hypertensionComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={hypertensionAfter === "Prior to"}
                                onChange={(e) => setHypertensionAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Hypertension Prior To', fControlName: 'hypertensionAfter', value: hypertensionAfter })}
                                value={"Prior to"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="hypertension-yes"
                                disabled={
                                  hypertensionComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={hypertensionAfter === "After"}
                                onChange={(e) => setHypertensionAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Hypertension After', fControlName: 'hypertensionAfter', value: hypertensionAfter })}
                                value={"After"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">NAV</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="hypertension-yes"
                                disabled={
                                  hypertensionComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={hypertensionAfter === "NAV"}
                                onChange={(e) => setHypertensionAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Hypertension NAV', fControlName: 'hypertensionAfter', value: hypertensionAfter })}
                                value={"NAV"}
                                type="radio"
                                className="mL5"
                              />
                              <button type="btn btn-primary" className={isCommentExist('section5', 'hypertensionAfter') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hypertensionAfter', value: hypertensionAfter, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Hypertension input', fControlName: 'yesHyperTensionInput', value: yesHyperTensionInput })}
                              disabled={
                                hypertensionComorbidities !== "Yes" ||
                                role === "ROLE_REVIEWER"
                              }
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                            <button type="btn btn-primary" className={isCommentExist('section5', 'yesHyperTensionInput') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yesHyperTensionInput', value: yesHyperTensionInput, section: 'section5' })}></button>
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            Dyslipidemia
                            <button type="btn btn-primary" className={isCommentExist('section5', 'dyslipidemiaComorbidities') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'dyslipidemiaComorbidities', value: dyslipidemiaComorbidities, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Dyslipidemia', fControlName: 'dyslipidemiaComorbidities', value: dyslipidemiaComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Dyslipidemia', fControlName: 'dyslipidemiaComorbidities', value: dyslipidemiaComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Dyslipidemia', fControlName: 'dyslipidemiaComorbidities', value: dyslipidemiaComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                                disabled={
                                  dyslipidemiaComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={dysliAfter === "Prior to"}
                                onChange={(e) => setDyslipidemiaAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Dyslipidemia Prior To', fControlName: 'dysliAfter', value: dysliAfter })}
                                value={"Prior to"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="dyslipidemia-yes"
                                disabled={
                                  dyslipidemiaComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={dysliAfter === "After"}
                                onChange={(e) => setDyslipidemiaAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Dyslipidemia After', fControlName: 'dysliAfter', value: dysliAfter })}
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
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Dyslipidemia NAV', fControlName: 'dysliAfter', value: dysliAfter })}
                                disabled={
                                  dyslipidemiaComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                type="radio"
                                className="mL5"
                              />
                              <button type="btn btn-primary" className={isCommentExist('section5', 'dysliAfter') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'dysliAfter', value: dysliAfter, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Dyslipidemia input', fControlName: 'yesDyslipidemiaInput', value: yesDyslipidemiaInput })}
                              disabled={
                                dyslipidemiaComorbidities !== "Yes" ||
                                role === "ROLE_REVIEWER"
                              }
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                            <button type="btn btn-primary" className={isCommentExist('section5', 'yesDyslipidemiaInput') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yesDyslipidemiaInput', value: yesDyslipidemiaInput, section: 'section5' })}></button>
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            Coronary Artery Disease
                            <button type="btn btn-primary" className={isCommentExist('section5', 'coronaryComorbidities') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'coronaryComorbidities', value: coronaryComorbidities, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Coronary Artery Disease', fControlName: 'coronaryComorbidities', value: coronaryComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Coronary Artery Disease', fControlName: 'coronaryComorbidities', value: coronaryComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Coronary Artery Disease', fControlName: 'coronaryComorbidities', value: coronaryComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                                disabled={
                                  coronaryComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={coronaryAfter === "Prior to"}
                                onChange={(e) => setCoronaryAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Coronary Artery Disease Prior To', fControlName: 'coronaryAfter', value: coronaryAfter })}
                                value={"Prior to"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="coronary-yes"
                                disabled={
                                  coronaryComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={coronaryAfter === "After"}
                                onChange={(e) => setCoronaryAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Coronary Artery Disease After', fControlName: 'coronaryAfter', value: coronaryAfter })}
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
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Coronary Artery Disease NAV', fControlName: 'coronaryAfter', value: coronaryAfter })}
                                value={"NAV"}
                                disabled={
                                  coronaryComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                type="radio"
                                className="mL5"
                              />
                              <button type="btn btn-primary" className={isCommentExist('section5', 'coronaryAfter') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'coronaryAfter', value: coronaryAfter, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Coronary Artery Disease input', fControlName: 'yesCoronaryInput', value: yesCoronaryInput })}
                              disabled={
                                coronaryComorbidities !== "Yes" ||
                                role === "ROLE_REVIEWER"
                              }
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                            <button type="btn btn-primary" className={isCommentExist('section5', 'yesCoronaryInput') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yesCoronaryInput', value: yesCoronaryInput, section: 'section5' })}></button>
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            Peripheral Vascular Disease
                            <button type="btn btn-primary" className={isCommentExist('section5', 'peripheralComorbidities') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'peripheralComorbidities', value: peripheralComorbidities, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Peripheral Vascular Disease', fControlName: 'peripheralComorbidities', value: peripheralComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Peripheral Vascular Disease', fControlName: 'peripheralComorbidities', value: peripheralComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Peripheral Vascular Disease', fControlName: 'peripheralComorbidities', value: peripheralComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                                disabled={
                                  peripheralComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={peripheralAfter === "Prior to"}
                                onChange={(e) => setPeripheralAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Peripheral Vascular Disease Prior To', fControlName: 'peripheralAfter', value: peripheralAfter })}
                                value={"Prior to"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="peripheral-yes"
                                disabled={
                                  peripheralComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                checked={peripheralAfter === "After"}
                                onChange={(e) => setPeripheralAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Peripheral Vascular Disease After', fControlName: 'peripheralAfter', value: peripheralAfter })}
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
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Peripheral Vascular Disease NAV', fControlName: 'peripheralAfter', value: peripheralAfter })}
                                disabled={
                                  peripheralComorbidities !== "Yes" ||
                                  role === "ROLE_REVIEWER"
                                }
                                type="radio"
                                className="mL5"
                              />
                              <button type="btn btn-primary" className={isCommentExist('section5', 'peripheralAfter') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'peripheralAfter', value: peripheralAfter, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Peripheral Vascular Disease input', fControlName: 'yesPeripheralInput', value: yesPeripheralInput })}
                              disabled={
                                peripheralComorbidities !== "Yes" ||
                                role === "ROLE_REVIEWER"
                              }
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                            <button type="btn btn-primary" className={isCommentExist('section5', 'yesPeripheralInput') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yesPeripheralInput', value: yesPeripheralInput, section: 'section5' })}></button>
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            HIV
                            <button type="btn btn-primary" className={isCommentExist('section5', 'hivComorbidities') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hivComorbidities', value: hivComorbidities, section: 'section5' })}></button>
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              required
                              checked={hivComorbidities === "Yes"}
                              value={"Yes"}
                              onChange={(e) => setComorbiditiesHiv(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'HIV', fControlName: 'hivComorbidities', value: hivComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'HIV', fControlName: 'hivComorbidities', value: hivComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'HIV', fControlName: 'hivComorbidities', value: hivComorbidities })}
                              disabled={role === "ROLE_REVIEWER"}
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
                                disabled={hivComorbidities !== "Yes" || role === "ROLE_REVIEWER"}
                                checked={hivAfter === "Prior to"}
                                onChange={(e) => setHIVAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'HIV Prior To', fControlName: 'hivAfter', value: hivAfter })}
                                value={"Prior to"}
                                type="radio"
                                className="mL5"
                              />
                              <label className="mL5">After</label>
                              <input
                                onKeyDown={handleKeyPress}
                                name="hivcom-yes"
                                disabled={hivComorbidities !== "Yes" || role === "ROLE_REVIEWER"}
                                checked={hivAfter === "After"}
                                onChange={(e) => setHIVAfter(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'HIV After', fControlName: 'hivAfter', value: hivAfter })}
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
                                onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'HIV NAV', fControlName: 'hivAfter', value: hivAfter })}
                                disabled={hivComorbidities !== "Yes" || role === "ROLE_REVIEWER"}
                                type="radio"
                                className="mL5"
                              />
                              <button type="btn btn-primary" className={isCommentExist('section5', 'hivAfter') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hivAfter', value: hivAfter, section: 'section5' })}></button>
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'HIV input', fControlName: 'yesHivInput', value: yesHivInput })}
                              disabled={
                                hivComorbidities !== "Yes" || role === "ROLE_REVIEWER"
                              }
                              type="text"
                              className="comorbidities-year"
                            // min={1}
                            // max={99}
                            />
                            <button type="btn btn-primary" className={isCommentExist('section5', 'yesHivInput') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yesHivInput', value: yesHivInput, section: 'section5' })}></button>
                          </td>
                        </tr>
                        <tr>
                          <td className="col-sm-3">
                            Non-liver cancer
                            <button type="btn btn-primary" className={isCommentExist('section5', 'nonLiverCancer') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'nonLiverCancer', value: nonLiverCancer, section: 'section5' })}></button>
                          </td>
                          <td className="col-sm-1 text-center">
                            <input
                              onKeyDown={handleKeyPress}
                              name="comorbidities-non-liver"
                              value={"Yes"}
                              checked={nonLiverCancer === "Yes"}
                              onChange={(e) => setNonLiverCancer(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Non-liver cancer', fControlName: 'nonLiverCancer', value: nonLiverCancer })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Non-liver cancer', fControlName: 'nonLiverCancer', value: nonLiverCancer })}
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Non-liver cancer', fControlName: 'nonLiverCancer', value: nonLiverCancer })}
                              disabled={role === "ROLE_REVIEWER"}
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
                          <button type="btn btn-primary" className={isCommentExist('section5', 'yesLocationSiteValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yesLocationSiteValue', value: yesLocationSiteValue, section: 'section5' })}></button>
                        </label>
                        <textarea
                          onKeyDown={handleKeyPress}
                          // // required={isChecked}
                          maxLength={20}
                          id="if-yes-location"
                          disabled={nonLiverCancer !== "Yes" || role === "ROLE_REVIEWER"}
                          value={yesLocationSiteValue}
                          onChange={(e) => setYesLocationSiteValue(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Location/site', fControlName: 'yesLocationSiteValue', value: yesLocationSiteValue })}
                          type="text"
                          className="form-control"
                          rows={1}
                        ></textarea>
                      </div>
                      <div className="col-sm-4">
                        <label htmlFor="if-yes-stage" className="label-txt">
                          If Yes, Stage
                          <button type="btn btn-primary" className={isCommentExist('section5', 'yesStageValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yesStageValue', value: yesStageValue, section: 'section5' })}></button>
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          // // required={isChecked}
                          id="if-yes-stage"
                          // min={10}
                          // max={99}
                          disabled={nonLiverCancer !== "Yes" || role === "ROLE_REVIEWER"}
                          value={yesStageValue}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,2}$/.test(inputValue)) {
                              setYesStageValue(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Stage', fControlName: 'yesStageValue', value: yesStageValue })}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label htmlFor="if-yes-diagnosis" className="label-txt">
                          If Yes, Year of Diagnosis
                          <button type="btn btn-primary" className={isCommentExist('section5', 'yesYearOfDiagnosis') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yesYearOfDiagnosis', value: yesYearOfDiagnosis, section: 'section5' })}></button>
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          // // required={isChecked}
                          id="if-yes-diagnosis"
                          // min={1900}
                          // max={2040}
                          disabled={nonLiverCancer !== "Yes" || role === "ROLE_REVIEWER"}
                          value={yesYearOfDiagnosis}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setYesYearOfdiagnosis(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Year of Diagnosis', fControlName: 'yesYearOfDiagnosis', value: yesYearOfDiagnosis })}
                          type="text"
                          placeholder="YYYY"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="container-width-for-chronic" style={{ marginTop: 20 }}>
                      <label className="label-txt">
                        Alcohol Consumption / Abuse
                        <button type="btn btn-primary" className={isCommentExist('section5', 'alcoholConsumptionValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'alcoholConsumptionValue', value: alcoholConsumptionValue, section: 'section5' })}></button>
                      </label>
                      <div className="chronic-mittal">
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            required
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Alcohol Consumption / Abuse', fControlName: 'alcoholConsumptionValue', value: alcoholConsumptionValue })}
                            name="Alcohol Consumption"
                            type="radio"
                          />
                          <label htmlFor="alcohol-consumption-no">No</label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap" disabled={role === "ROLE_REVIEWER"}
                            id="alcohol-consumption-yes"
                            checked={alcoholConsumptionValue === "Yes"}
                            value={"Yes"}
                            onChange={(e) =>
                              setAlcoholConsumptionValue(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Alcohol Consumption / Abuse', fControlName: 'alcoholConsumptionValue', value: alcoholConsumptionValue })}
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
                            disabled={
                              alcoholConsumptionValue !== "Yes" ||
                              role === "ROLE_REVIEWER"
                            }
                            onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Alcohol Consumption / Abuse', fControlName: 'alcoholConsumptionValue', value: alcoholConsumptionValue })}
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
                            disabled={
                              alcoholConsumptionValue !== "Yes" ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={
                              alcoholConsumptionValueSub ===
                              "documentation of alcoholistm/alcoholic abuse in progress notes"
                            }
                            value={
                              "documentation of alcoholistm/alcoholic abuse in progress notes"
                            }
                            onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Alcohol Consumption / Abuse Sub', fControlName: 'alcoholConsumptionValueSub', value: alcoholConsumptionValueSub })}
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
                            disabled={
                              alcoholConsumptionValue !== "Yes" ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={
                              alcoholConsumptionValueSub ===
                              "enrollment in rehabilitation"
                            }
                            onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Alcohol Consumption / Abuse Sub', fControlName: 'alcoholConsumptionValueSub', value: alcoholConsumptionValueSub })}
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
                            disabled={
                              alcoholConsumptionValue !== "Yes" ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={
                              alcoholConsumptionValueSub ===
                              "history of alcoholic hepatitis"
                            }
                            onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Alcohol Consumption / Abuse Sub', fControlName: 'alcoholConsumptionValueSub', value: alcoholConsumptionValueSub })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            id="alcohol-consumption-unknown"
                            // disabled={alcoholConsumptionValue !== "Yes"}
                            checked={alcoholConsumptionValue === "Unknown"}
                            value={"Unknown"}
                            onBlur={() => handleAuditDetails({ id: 5, name: 'Comorbidities', fName: 'Alcohol Consumption / Abuse Unknown', fControlName: 'alcoholConsumptionValue', value: alcoholConsumptionValue })}
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
                {hccDiagnosisUp ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={hccDiagnosisUp ? "study-data" : ""}>
              <Fade>
                <div className="card p-3">
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Method of Diagnosis
                        <button type="btn btn-primary" className={isCommentExist('section6', 'diagnosisInformationValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'diagnosisInformationValue', value: diagnosisInformationValue, section: 'section6' })}></button></label>
                    </div>
                    <div className="col-sm-8">
                      <div className="chronic-mittal">
                        <div style={{ display: 'inline-flex' }}>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            required={!diagnosisInformationValue.length}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Method of Diagnosis', fControlName: 'diagnosisInformationValue', value: diagnosisInformationValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            className="gap"
                            required={!diagnosisInformationValue.length}
                            id="diagnosis-information-other"
                            checked={diagnosisInformationValue.includes("Other(specify)")}
                            value={"Other(specify)"}
                            onChange={(e) => {
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
                            onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Method of Diagnosis', fControlName: 'diagnosisInformationValue', value: diagnosisInformationValue })}
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
                            required={diagnosisInformationValue === "Other(specify)"}
                            disabled={
                              !diagnosisInformationValue.includes("Other(specify)") ||
                              role === "ROLE_REVIEWER"
                            }
                            onChange={(e) => sethccDiagnosisInfo(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Method of Diagnosis', fControlName: 'hccDiagnosisInfoValueOtherSpecify', value: hccDiagnosisInfoValueOtherSpecify })}
                            value={hccDiagnosisInfoValueOtherSpecify}
                          ></textarea>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            disabled={role === "ROLE_REVIEWER"}
                            id="diagnosis-imaging"
                            required={!diagnosisInformationValue.length}
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
                            onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Method of Diagnosis', fControlName: 'diagnosisInformationValue', value: diagnosisInformationValue })}
                            name="diagnosis-information"
                            type="checkbox"
                          />
                          <label htmlFor="diagnosis-imaging" style={{ marginTop: 10 }}>Imaging</label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            className="gap"
                            required={!diagnosisInformationValue.length}
                            disabled={role === "ROLE_REVIEWER"}
                            id="diagnosis-unknown"
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
                            onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Method of Diagnosis', fControlName: 'diagnosisInformationValue', value: diagnosisInformationValue })}
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
                      <label className="label-txt" style={{ fontWeight: 600 }}>Type of Imaging
                        <button type="btn btn-primary" className={isCommentExist('section6', 'typeOfImagine') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'typeOfImagine', value: typeOfImagine, section: 'section6' })}></button></label>
                    </div>
                    <div className="col-sm-8">
                      <div style={{ display: 'inline-flex' }}>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER" || !diagnosisInformationValue.includes("Imaging")}
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
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Type of Imaging', fControlName: 'typeOfImagine', value: typeOfImagine })}
                          id="hcc-imaging-mri"
                          type="radio"
                        />
                        <label htmlFor="hcc-imaging-mri" style={{ marginTop: 10 }}>MRI</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER" || !diagnosisInformationValue.includes("Imaging")}
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
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Type of Imaging', fControlName: 'typeOfImagine', value: typeOfImagine })}
                          required
                          id="hcc-imaging-ct"
                          type="radio"
                        />
                        <label htmlFor="hcc-imaging-ct" style={{ marginTop: 10 }}>CT</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER" || !diagnosisInformationValue.includes("Imaging")}
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
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Type of Imaging', fControlName: 'typeOfImagine', value: typeOfImagine })}
                          required
                          id="hcc-imaging-us"
                          type="radio"
                        />
                        <label htmlFor="hcc-imaging-us" style={{ marginTop: 10 }}>US</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER" || !diagnosisInformationValue.includes("Imaging")}
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
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Type of Imaging', fControlName: 'typeOfImagine', value: typeOfImagine })}
                          required
                          id="hcc-imaging-un"
                          type="radio"
                        />
                        <label htmlFor="hcc-imaging-un" style={{ marginTop: 10 }}>Unknown</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER" || !diagnosisInformationValue.includes("Imaging")}
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
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Type of Imaging', fControlName: 'typeOfImagine', value: typeOfImagine })}
                          required
                          id="hcc-imaging-other"
                          type="radio"
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
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Type of Imaging', fControlName: 'typeOfImagineText', value: typeOfImagineText })}
                          required={typeOfImagine === "Other"}
                          disabled={typeOfImagine !== "Other" || role === "ROLE_REVIEWER"}
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        Date of Imaging(first) Found
                        <button type="btn btn-primary" className={isCommentExist('section6', 'hccDiagnosisImagingDate') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hccDiagnosisImagingDate', value: hccDiagnosisImagingDate, section: 'section6' })}></button>
                      </label>
                    </div>
                    <div className="col-sm-8" style={{ display: 'inline-flex' }}>
                      <div className="container-width">
                        <input
                          onKeyDown={handleKeyPress}
                          value={hccDiagnosisImagingDate}
                          disabled={
                            (hccDiagnosisImagingUnkown && hccDiagnosisImagingUnkown[0] === "Unknown") ||
                            role === "ROLE_REVIEWER" || !diagnosisInformationValue.includes("Imaging")
                          }
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            sethccDiagnosisImagingDate(formattedDate);
                          }}
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Date of Imaging(first) Found', fControlName: 'hccDiagnosisImagingDate', value: hccDiagnosisImagingDate })}
                          className="form-control"
                          type="date"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={hccDiagnosisImagingDate}
                          onChange={date => sethccDiagnosisImagingDate(date)}
                          disabled={hccDiagnosisImagingUnkown[0] === "Unknown" || !diagnosisInformationValue.includes("Imaging") || role === "ROLE_REVIEWER"}
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Date of Imaging(first) Found', fControlName: 'hccDiagnosisImagingDate', value: hccDiagnosisImagingDate })}
                          startDate={hccDiagnosisImagingDate}
                          dateFormat={'dd/MMM/yyyy'}
                          className="form-control date"
                          placeholderText="DD/MMM/YYYY"
                        /> */}
                      </div>
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER" || !diagnosisInformationValue.includes("Imaging")}
                          id="hccdate-imaging"
                          checked={hccDiagnosisImagingUnkown.includes("Unknown")}
                          onChange={() => handleDiagnosisImagingUnknown("Unknown")}
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Date of Imaging(first) Found', fControlName: 'hccDiagnosisImagingUnkown', value: hccDiagnosisImagingUnkown })}
                          className="date-tissue hcc-unknown"
                          type="checkbox"
                        />
                        <label htmlFor="hccdate-imaging" className="mL5">Unknown</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-subject">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Date of Tissue Diagnosis
                        <button type="btn btn-primary" className={isCommentExist('section6', 'hccDiagnosisTissueDate') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hccDiagnosisTissueDate', value: hccDiagnosisTissueDate, section: 'section6' })}></button></label>
                    </div>
                    <div className="col-sm-8" style={{ display: 'inline-flex' }}>
                      <div className="container-width">
                        <input
                          onKeyDown={handleKeyPress}
                          value={hccDiagnosisTissueDate}
                          disabled={
                            (hccDiagnosisTissueUnknown && hccDiagnosisTissueUnknown[0] === "Unknown") ||
                            role === "ROLE_REVIEWER" || !diagnosisInformationValue.includes("Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)")
                          }
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            sethccDiagnosisTissueDate(formattedDate);
                          }}
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Date of Tissue Diagnosis', fControlName: 'hccDiagnosisTissueDate', value: hccDiagnosisTissueDate })}
                          className="form-control"
                          type="date"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={hccDiagnosisTissueDate}
                          disabled={
                            hccDiagnosisTissueUnknown[0] === "Unknown" ||
                            role === "ROLE_REVIEWER" || !diagnosisInformationValue.includes("Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)")
                          }
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Date of Tissue Diagnosis', fControlName: 'hccDiagnosisTissueDate', value: hccDiagnosisTissueDate })}
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
                          disabled={role === "ROLE_REVIEWER" || !diagnosisInformationValue.includes("Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)")}
                          id="hccdate-tissue"
                          checked={hccDiagnosisTissueUnknown.includes("Unknown")}
                          onChange={() => handleDiagnosisTissueUnknown("Unknown")}
                          onBlur={() => handleAuditDetails({ id: 6, name: 'HCC Diagnosis Information', fName: 'Date of Tissue Diagnosis', fControlName: 'hccDiagnosisTissueUnknown', value: hccDiagnosisTissueUnknown })}
                          className="date-tissue hcc-unknown"
                          type="checkbox"
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
                {HCCStagingUp ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={HCCStagingUp ? "study-data" : ""}>
              <Fade>
                <div className="card p-3">
                  <div className="container-width" style={{ width: '100%' }}>
                    <div className="col-sm-4">
                      <label htmlFor="large-turmor-size" className="label-txt" style={{ fontWeight: 600 }}>
                        Largest tumor size/diameter (if multiple nodules, include only the largest)
                        <button type="btn btn-primary" className={isCommentExist('section7', 'largeTurmorValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'largeTurmorValue', value: largeTurmorValue, section: 'section7' })}></button>
                      </label>
                    </div>
                    <div className="col-sm-8" style={{ display: 'inline-flex' }}>
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        disabled={role === "ROLE_REVIEWER"}
                        maxLength={5}
                        style={{ width: 150, height: 'fit-content' }}
                        id="large-turmor-size"
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
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Largest Tumor Size/Diameter', fControlName: 'largeTurmorValue', value: largeTurmorValue })}
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
                        <button type="btn btn-primary" className={isCommentExist('section7', 'tPrimaryValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'tPrimaryValue', value: tPrimaryValue, section: 'section7' })}></button>
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        required
                        id="t-primary-tx"
                        checked={tPrimaryValue === "TX"}
                        value={"TX"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'T(Primary Tumor)(as per Current TNM HCC classfication)', fControlName: 'tPrimaryValue', value: tPrimaryValue })}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-tx">TX</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        id="t-primary-t0"
                        checked={tPrimaryValue === "T0"}
                        value={"T0"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'T(Primary Tumor)(as per Current TNM HCC classfication)', fControlName: 'tPrimaryValue', value: tPrimaryValue })}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t0">T0</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        id="t-primary-t1"
                        checked={tPrimaryValue === "T1"}
                        value={"T1"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'T(Primary Tumor)(as per Current TNM HCC classfication)', fControlName: 'tPrimaryValue', value: tPrimaryValue })}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t1">T1</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        id="t-primary-t2"
                        checked={tPrimaryValue === "T2"}
                        value={"T2"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'T(Primary Tumor)(as per Current TNM HCC classfication)', fControlName: 'tPrimaryValue', value: tPrimaryValue })}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t2">T2</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        id="t-primary-t3a"
                        checked={tPrimaryValue === "T3a"}
                        value={"T3a"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'T(Primary Tumor)(as per Current TNM HCC classfication)', fControlName: 'tPrimaryValue', value: tPrimaryValue })}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t3a">T3a</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        id="t-primary-t3b"
                        checked={tPrimaryValue === "T3b"}
                        value={"T3b"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'T(Primary Tumor)(as per Current TNM HCC classfication)', fControlName: 'tPrimaryValue', value: tPrimaryValue })}
                        name="t-primary-tumor"
                        type="radio"
                      />
                      <label htmlFor="t-primary-t3b">T3b</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        id="t-primary-t4"
                        checked={tPrimaryValue === "T4"}
                        value={"T4"}
                        onChange={(e) => setTPrimaryValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'T(Primary Tumor)(as per Current TNM HCC classfication)', fControlName: 'tPrimaryValue', value: tPrimaryValue })}
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
                        <button type="btn btn-primary" className={isCommentExist('section7', 'nRegionalValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'nRegionalValue', value: nRegionalValue, section: 'section7' })}></button>
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        required
                        id="n-regional-nx"
                        checked={nRegionalValue === "NX"}
                        value={"NX"}
                        onChange={(e) => setNRegionalValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'N(Regional Lymph Nodes)(as per Current TNM HCC Classfication)', fControlName: 'nRegionalValue', value: nRegionalValue })}
                        name="n-regional-lymph"
                        type="radio"
                      />
                      <label htmlFor="n-regional-nx">NX</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        id="n-regional-n0"
                        checked={nRegionalValue === "N0"}
                        value={"N0"}
                        onChange={(e) => setNRegionalValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'N(Regional Lymph Nodes)(as per Current TNM HCC Classfication)', fControlName: 'nRegionalValue', value: nRegionalValue })}
                        name="n-regional-lymph"
                        type="radio"
                      />
                      <label htmlFor="n-regional-n0">N0</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        id="n-regional-n1"
                        checked={nRegionalValue === "N1"}
                        value={"N1"}
                        onChange={(e) => setNRegionalValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'N(Regional Lymph Nodes)(as per Current TNM HCC Classfication)', fControlName: 'nRegionalValue', value: nRegionalValue })}
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
                        <button type="btn btn-primary" className={isCommentExist('section7', 'mRegionalValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'mRegionalValue', value: mRegionalValue, section: 'section7' })}></button>
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        required
                        id="n-regional-mx"
                        checked={mRegionalValue === "MX"}
                        value={"MX"}
                        name="n-regional-metastasis"
                        onChange={(e) => setMRegionalValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'M(Distant Metastasis)(as per Current TNM HCC Classfication)', fControlName: 'mRegionalValue', value: mRegionalValue })}
                        type="radio"
                      />
                      <label htmlFor="n-regional-mx">MX</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        id="n-regional-m0"
                        checked={mRegionalValue === "M0"}
                        value={"M0"}
                        onChange={(e) => setMRegionalValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'M(Distant Metastasis)(as per Current TNM HCC Classfication)', fControlName: 'mRegionalValue', value: mRegionalValue })}
                        name="n-regional-metastasis"
                        type="radio"
                      />
                      <label htmlFor="n-regional-m0">M0</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="gap"
                        id="n-regional-m1"
                        checked={mRegionalValue === "M1"}
                        value={"M1"}
                        onChange={(e) => setMRegionalValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'M(Distant Metastasis)(as per Current TNM HCC Classfication)', fControlName: 'mRegionalValue', value: mRegionalValue })}
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
                        <button type="btn btn-primary" className={isCommentExist('section7', 'anatomicStageTNM') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'anatomicStageTNM', value: anatomicStageTNM, section: 'section7' })}></button>
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
                            disabled={role === "ROLE_REVIEWER"}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              required
                              id="anatomic-stage1"
                              checked={anatomicStageTNM === "Stage I(T1 N0 M0)"}
                              value={"Stage I(T1 N0 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="anatomic-stage3b"
                              checked={anatomicStageTNM === "Stage IIIB(T3b N0 M0)"}
                              value={"Stage IIIB(T3b N0 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="anatomic-stage4b"
                              checked={
                                anatomicStageTNM === "Stage IVB(Any T Any N M1)"
                              }
                              value={"Stage IVB(Any T Any N M1)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="anatomic-stage2"
                              checked={anatomicStageTNM === "Stage II(T2 N0 M0)"}
                              value={"Stage II(T2 N0 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="anatomic-stage3c"
                              checked={anatomicStageTNM === "Stage IIIC(T4 N0 M0)"}
                              value={"Stage IIIC(T4 N0 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="anatomic-stagenav"
                              checked={anatomicStageTNM === "NAV/Cannot be staged"}
                              value={"NAV/Cannot be staged"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="anatomic-stage3a"
                              checked={anatomicStageTNM === "Stage IIIA(T3a N0 M0)"}
                              value={"Stage IIIA(T3a N0 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="anatomic-stage4a"
                              checked={
                                anatomicStageTNM === "Stage IVA(Any T N1 M0)"
                              }
                              value={"Stage IVA(Any T N1 M0)"}
                              onChange={(e) => setAnatomicStageTNM(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Anatomic Stage(as per Current TNM HCC Classfication)', fControlName: 'anatomicStageTNM', value: anatomicStageTNM })}
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
                      <label className="label-txt" style={{ fontWeight: 600 }}>Tumor Differentiation
                        <button type="btn btn-primary" className={isCommentExist('section7', 'tumorDiffValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'tumorDiffValue', value: tumorDiffValue, section: 'section7' })}></button></label>
                    </div>
                    <div className="col-sm-8">
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          required
                          id="tumor-differentiation-well"
                          checked={tumorDiffValue === "Well"}
                          value={"Well"}
                          onChange={(e) => setTumorDiffValue(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Differentiation', fControlName: 'tumorDiffValue', value: tumorDiffValue })}
                          name="tumor-differentiation"
                          type="radio"
                        />
                        <label htmlFor="tumor-differentiation-well">Well</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="tumor-differentiation-moderate"
                          checked={tumorDiffValue === "Moderate"}
                          value={"Moderate"}
                          onChange={(e) => setTumorDiffValue(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Differentiation', fControlName: 'tumorDiffValue', value: tumorDiffValue })}
                          name="tumor-differentiation"
                          type="radio"
                        />
                        <label htmlFor="tumor-differentiation-moderate">
                          Moderate
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="tumor-differentiation-poor"
                          checked={tumorDiffValue === "Poor"}
                          value={"Poor"}
                          onChange={(e) => setTumorDiffValue(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Differentiation', fControlName: 'tumorDiffValue', value: tumorDiffValue })}
                          name="tumor-differentiation"
                          type="radio"
                        />
                        <label htmlFor="tumor-differentiation-poor">Poor</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="tumor-differentiation-nav"
                          checked={tumorDiffValue === "Nav"}
                          value={"Nav"}
                          onChange={(e) => setTumorDiffValue(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Differentiation', fControlName: 'tumorDiffValue', value: tumorDiffValue })}
                          name="tumor-differentiation"
                          type="radio"
                        />
                        <label htmlFor="tumor-differentiation-nav">NAV</label>
                      </div>
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="tumor-differentiation-anaplastic"
                          checked={tumorDiffValue === "Undifferentiated/anaplastic"}
                          value={"Undifferentiated/anaplastic"}
                          onChange={(e) => setTumorDiffValue(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Differentiation', fControlName: 'tumorDiffValue', value: tumorDiffValue })}
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
                        <button type="btn btn-primary" className={isCommentExist('section7', 'ecogperformace') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'ecogperformace', value: ecogperformace, section: 'section7' })}></button>
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
                            disabled={role === "ROLE_REVIEWER"}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              required
                              id="ecog-performance0"
                              checked={ecogperformace === "0 (KPS 90 or 100)"}
                              value={"0 (KPS 90 or 100)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="ecog-performance3"
                              checked={ecogperformace === "3 (KPS 30 or 40)"}
                              value={"3 (KPS 30 or 40)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="ecog-performance1-70"
                              checked={ecogperformace === "1 (KPS 70 or 80)"}
                              value={"1 (KPS 70 or 80)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="ecog-performance-4-20"
                              checked={ecogperformace === "4 (KPS 10 or 20)"}
                              value={"4 (KPS 10 or 20)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              id="ecog-performance-2-50"
                              checked={ecogperformace === "2 (KPS 50 or 60)"}
                              value={"2 (KPS 50 or 60)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              className="gap"
                              id="ecog-performance-3-dead"
                              checked={ecogperformace === "5 (KPS 0 = dead)"}
                              value={"5 (KPS 0 = dead)"}
                              onChange={(e) => setEcogPerformace(e.target.value)}
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'ECOG Performance Score', fControlName: 'ecogperformace', value: ecogperformace })}
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
                      <label className="label-txt" style={{ fontWeight: 600 }}>Tumor Stage
                        <button type="btn btn-primary" className={isCommentExist('section7', 'tumorStageValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'tumorStageValue', value: tumorStageValue, section: 'section7' })}></button>
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <div className="">
                        <div className="d-subject">
                          <div className="chronic-mittal">
                            <div className="tumor-stage">
                              <input
                                onKeyDown={handleKeyPress}
                                disabled={role === "ROLE_REVIEWER"}
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
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Stage', fControlName: 'tumorStageValue', value: tumorStageValue })}
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
                                disabled={role === "ROLE_REVIEWER"}
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
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Stage', fControlName: 'tumorStageValue', value: tumorStageValue })}
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
                                disabled={role === "ROLE_REVIEWER"}
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
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Stage', fControlName: 'tumorStageValue', value: tumorStageValue })}
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
                                disabled={role === "ROLE_REVIEWER"}
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
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Stage', fControlName: 'tumorStageValue', value: tumorStageValue })}
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
                                disabled={role === "ROLE_REVIEWER"}
                                className="gap"
                                id="tumor-stage-any"
                                checked={tumorStageValue === "Any"}
                                value={"Any"}
                                onChange={(e) => setTumorStageValue(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Stage', fControlName: 'tumorStageValue', value: tumorStageValue })}
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
                                disabled={role === "ROLE_REVIEWER"}
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
                        <button type="btn btn-primary" className={isCommentExist('section7', 'typeOfVascular') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'typeOfVascular', value: typeOfVascular, section: 'section7' })}></button>
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <div className="">
                        <div className="d-subject">
                          <div className="chronic-mittal">
                            <div className="tumor-stage">
                              <input
                                onKeyDown={handleKeyPress}
                                disabled={role === "ROLE_REVIEWER"}
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
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Type of Vascular Invasion/Extrahepatic Spread', fControlName: 'typeOfVascular', value: typeOfVascular })}
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
                                disabled={role === "ROLE_REVIEWER"}
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
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Type of Vascular Invasion/Extrahepatic Spread', fControlName: 'typeOfVascular', value: typeOfVascular })}
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
                                disabled={role === "ROLE_REVIEWER"}
                                className="gap"
                                id="vascular-invasion-extrahepatic"
                                checked={
                                  typeOfVascular ===
                                  "Extrahepatic spread(outside Milan)"
                                }
                                value={"Extrahepatic spread(outside Milan)"}
                                onChange={(e) => setTypeOfVascular(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Type of Vascular Invasion/Extrahepatic Spread', fControlName: 'typeOfVascular', value: typeOfVascular })}
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
                        <button type="btn btn-primary" className={isCommentExist('section7', 'microvascularInvasion') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'microvascularInvasion', value: microvascularInvasion, section: 'section7' })}></button>
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          required
                          id="mircovascular-invasion-yes"
                          checked={microvascularInvasion === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setMicrovascularInvasion(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Is Microvascular Invasion Present on Histology', fControlName: 'microvascularInvasion', value: microvascularInvasion })}
                          name="microvascular-invasion-histology"
                          type="radio"
                        />
                        <label htmlFor="mircovascular-invasion-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="mircovascular-invasion-no"
                          checked={microvascularInvasion === "No"}
                          value={"No"}
                          onChange={(e) => setMicrovascularInvasion(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Is Microvascular Invasion Present on Histology', fControlName: 'microvascularInvasion', value: microvascularInvasion })}
                          name="microvascular-invasion-histology"
                          type="radio"
                        />
                        <label htmlFor="mircovascular-invasion-no">No</label>

                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="mircovascular-invasion-not-enough"
                          checked={
                            microvascularInvasion ===
                            "Not enough information from histology"
                          }
                          value={"Not enough information from histology"}
                          onChange={(e) => setMicrovascularInvasion(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Is Microvascular Invasion Present on Histology', fControlName: 'microvascularInvasion', value: microvascularInvasion })}
                          name="microvascular-invasion-histology"
                          type="radio"
                        />
                        <label htmlFor="mircovascular-invasion-not-enough">
                          Not enough information from histology
                        </label>
                        <br />
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="mircovascular-invasion-histology"
                          checked={
                            microvascularInvasion === "Histology is not available"
                          }
                          value={"Histology is not available"}
                          onChange={(e) => setMicrovascularInvasion(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Is Microvascular Invasion Present on Histology', fControlName: 'microvascularInvasion', value: microvascularInvasion })}
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
                        <button type="btn btn-primary" className={isCommentExist('section7', 'tumorWithinMilan') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'tumorWithinMilan', value: tumorWithinMilan, section: 'section7' })}></button>
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
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Within Milan Criteria', fControlName: 'tumorWithinMilan', value: tumorWithinMilan })}
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
                              disabled={role === "ROLE_REVIEWER"}
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
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Within Milan Criteria', fControlName: 'tumorWithinMilan', value: tumorWithinMilan })}
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
                              disabled={role === "ROLE_REVIEWER"}
                              id="tumor-widthin-milan-notenough"
                              checked={
                                tumorWithinMilan === "Not enough information"
                              }
                              value={"Not enough information"}
                              onChange={(e) =>
                                setTumorWithinMilan(e.target.value)
                              }
                              onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Tumor Within Milan Criteria', fControlName: 'tumorWithinMilan', value: tumorWithinMilan })}
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
                        <button type="btn btn-primary" className={isCommentExist('section7', 'childPughClassfication') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'childPughClassfication', value: childPughClassfication, section: 'section7' })}></button>
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          required
                          id="child-pugh-classifcation-child-a"
                          checked={childPughClassfication === "Child A"}
                          value={"Child A"}
                          onChange={(e) =>
                            setChildPughClassfication(e.target.value)
                          }
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Child-Pugh Classfication(at time of diagnosis)', fControlName: 'childPughClassfication', value: childPughClassfication })}
                          name="child-pugh-classifcation"
                          type="radio"
                        />
                        <label htmlFor="child-pugh-classifcation-child-a">
                          Child A
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="child-pugh-classifcation-child-ab"
                          checked={childPughClassfication === "Child A-B"}
                          value={"Child A-B"}
                          onChange={(e) =>
                            setChildPughClassfication(e.target.value)
                          }
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Child-Pugh Classfication(at time of diagnosis)', fControlName: 'childPughClassfication', value: childPughClassfication })}
                          name="child-pugh-classifcation"
                          type="radio"
                        />
                        <label htmlFor="child-pugh-classifcation-child-ab">
                          Child A-B
                        </label>

                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="child-pugh-classifcation-child-b"
                          checked={childPughClassfication === "Child B"}
                          value={"Child B"}
                          onChange={(e) =>
                            setChildPughClassfication(e.target.value)
                          }
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Child-Pugh Classfication(at time of diagnosis)', fControlName: 'childPughClassfication', value: childPughClassfication })}
                          name="child-pugh-classifcation"
                          type="radio"
                        />
                        <label htmlFor="child-pugh-classifcation-child-b">
                          Child B
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="child-pugh-classifcation-child-c"
                          checked={childPughClassfication === "Child C"}
                          value={"Child C"}
                          onChange={(e) =>
                            setChildPughClassfication(e.target.value)
                          }
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Child-Pugh Classfication(at time of diagnosis)', fControlName: 'childPughClassfication', value: childPughClassfication })}
                          name="child-pugh-classifcation"
                          type="radio"
                        />
                        <label htmlFor="child-pugh-classifcation-child-c">
                          Child C
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          id="child-pugh-classifcation-child-unknown"
                          checked={childPughClassfication === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) =>
                            setChildPughClassfication(e.target.value)
                          }
                          onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Child-Pugh Classfication(at time of diagnosis)', fControlName: 'childPughClassfication', value: childPughClassfication })}
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
                        <button type="btn btn-primary" className={isCommentExist('section7', 'barcelonaClinic') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'barcelonaClinic', value: barcelonaClinic, section: 'section7' })}></button>
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
                                disabled={role === "ROLE_REVIEWER"}
                                id="barcelona-clinic-0"
                                checked={
                                  barcelonaClinic ===
                                  "Stage 0: Very early HCC (all criteria should be fulfilled)"
                                }
                                value={
                                  "Stage 0: Very early HCC (all criteria should be fulfilled)"
                                }
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Barcelona Clinic Liver Cancer (BCLC) Stage', fControlName: 'barcelonaClinic', value: barcelonaClinic })}
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
                                disabled={role === "ROLE_REVIEWER"}
                                id="barcelona-clinic-stagea"
                                checked={
                                  barcelonaClinic ===
                                  "Stage A: early HCC (all criteria should be fulfilled)"
                                }
                                value={
                                  "Stage A: early HCC (all criteria should be fulfilled)"
                                }
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Barcelona Clinic Liver Cancer (BCLC) Stage', fControlName: 'barcelonaClinic', value: barcelonaClinic })}
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
                                disabled={role === "ROLE_REVIEWER"}
                                id="barcelona-clinic-stageb"
                                checked={
                                  barcelonaClinic ===
                                  "Stage B: Intermediate HCC (all criteria should be fulfilled)"
                                }
                                value={
                                  "Stage B: Intermediate HCC (all criteria should be fulfilled)"
                                }
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Barcelona Clinic Liver Cancer (BCLC) Stage', fControlName: 'barcelonaClinic', value: barcelonaClinic })}
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
                                disabled={role === "ROLE_REVIEWER"}
                                id="barcelona-clinic-stagec"
                                checked={
                                  barcelonaClinic ===
                                  "Stage C: advanced HCC(at least one criteria ECOG 1-2 or vascular invasion/extrahepatic spread)"
                                }
                                value={
                                  "Stage C: advanced HCC(at least one criteria ECOG 1-2 or vascular invasion/extrahepatic spread)"
                                }
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Barcelona Clinic Liver Cancer (BCLC) Stage', fControlName: 'barcelonaClinic', value: barcelonaClinic })}
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
                                disabled={role === "ROLE_REVIEWER"}
                                id="barcelona-clinic-staged"
                                checked={
                                  barcelonaClinic ===
                                  "Stage D: end-stage HCC(at least one criteria ECOG 3-4 or Child C)"
                                }
                                value={
                                  "Stage D: end-stage HCC(at least one criteria ECOG 3-4 or Child C)"
                                }
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Barcelona Clinic Liver Cancer (BCLC) Stage', fControlName: 'barcelonaClinic', value: barcelonaClinic })}
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
                                disabled={role === "ROLE_REVIEWER"}
                                id="barcelona-clinic-stage-not"
                                checked={
                                  barcelonaClinic ===
                                  "Not Available/cannot be calculated"
                                }
                                value={"Not Available/cannot be calculated"}
                                onChange={(e) => setBarcelonaClinic(e.target.value)}
                                onBlur={() => handleAuditDetails({ id: 7, name: 'HCC Staging', fName: 'Barcelona Clinic Liver Cancer (BCLC) Stage', fControlName: 'barcelonaClinic', value: barcelonaClinic })}
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
                  {chronicButton ? <ArrowDownward /> : <ArrowUpward />}
                </button>
              </div>
              <div className={chronicButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="container-width" style={{ width: '100%' }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is Fatty Liver Present?
                          <button type="btn btn-primary" className={isCommentExist('section8', 'fattyLiverCLD') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'fattyLiverCLD', value: fattyLiverCLD, section: 'section8' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          className="screen-m"
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          // className="gap"
                          required
                          id="cld-yes"
                          checked={fattyLiverCLD === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setFattyLiverCLD(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Is Fatty Liver Present?', fControlName: 'fattyLiverCLD', value: fattyLiverCLD })}
                          name="fattyLiver"
                          type="radio"
                        />
                        <label className="cld-fatty" htmlFor="cld-yes">Yes</label>
                        <input
                          className="screen-m"
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          // className="gap"
                          id="cld-no"
                          checked={fattyLiverCLD === "No"}
                          value={"No"}
                          onChange={(e) => setFattyLiverCLD(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Is Fatty Liver Present?', fControlName: 'fattyLiverCLD', value: fattyLiverCLD })}
                          name="fattyLiver"
                          type="radio"
                        />
                        <label className="cld-fatty" htmlFor="cld-no">No</label>
                        <input
                          className="screen-m"
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          // className="gap"
                          id="cld-unknown"
                          checked={fattyLiverCLD === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => setFattyLiverCLD(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Is Fatty Liver Present?', fControlName: 'fattyLiverCLD', value: fattyLiverCLD })}
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
                          <button type="btn btn-primary" className={isCommentExist('section8', 'fattyLiverRadioLast') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'fattyLiverRadioLast', value: fattyLiverRadioLast, section: 'section8' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          disabled={role === "ROLE_REVIEWER"}
                          className="chronicliver-ww margin-right-radio chronic-down"
                          value={"Imaging"}
                          checked={fattyLiverRadioLast === "Imaging"}
                          onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Fatty Liver Diagnostic Modality', fControlName: 'fattyLiverRadioLast', value: fattyLiverRadioLast })}
                          name="fatty-modality"
                          type="radio"
                        />
                        <label className="cld-fatty">Imaging</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="chronicliver-ww margin-right-radio chronic-down"
                          value={"Biopsy"}
                          checked={fattyLiverRadioLast === "Biopsy"}
                          onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Fatty Liver Diagnostic Modality', fControlName: 'fattyLiverRadioLast', value: fattyLiverRadioLast })}
                          name="fatty-modality"
                          type="radio"
                        />
                        <label className="cld-fatty">Biopsy</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="chronicliver-ww margin-right-radio chronic-down"
                          value={"Clinical"}
                          checked={fattyLiverRadioLast === "Clinical"}
                          onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Fatty Liver Diagnostic Modality', fControlName: 'fattyLiverRadioLast', value: fattyLiverRadioLast })}
                          name="fatty-modality"
                          type="radio"
                        />
                        <label className="cld-fatty">Clinical</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="chronicliver-ww margin-right-radio chronic-down"
                          value={"Other"}
                          checked={fattyLiverRadioLast === "Other"}
                          onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Fatty Liver Diagnostic Modality', fControlName: 'fattyLiverRadioLast', value: fattyLiverRadioLast })}
                          name="fatty-modality"
                          type="radio"
                        />
                        <label className="cld-fatty">Other</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="chronicliver-ww margin-right-radio chronic-down"
                          value={"NA"}
                          checked={fattyLiverRadioLast === "NA"}
                          onChange={(e) => setFattyLiverRadioLast(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Fatty Liver Diagnostic Modality', fControlName: 'fattyLiverRadioLast', value: fattyLiverRadioLast })}
                          name="fatty-modality"
                          type="radio"
                        />
                        <label className="cld-fatty">NA</label>
                      </div>
                    </div>

                    <div className="container-width" style={{ width: '100%' }}>
                      <div className="col-sm-4">
                        <label htmlFor="fatty-liver-diagnostic" className="label-txt" style={{ fontWeight: 600 }}>
                          Fatty Liver Diagnostic Modality Free Text
                          <button type="btn btn-primary" className={isCommentExist('section8', 'fattyLiverDiagnosticFreeText') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'fattyLiverDiagnosticFreeText', value: fattyLiverDiagnosticFreeText, section: 'section8' })}></button>
                        </label>
                      </div>
                      <textarea
                        onKeyDown={handleKeyPress}
                        required
                        disabled={role === "ROLE_REVIEWER"}
                        maxLength={100}
                        id="fatty-liver-diagnostic"
                        value={fattyLiverDiagnosticFreeText}
                        onChange={(e) =>
                          setFattyLiverDiagnosticFreeText(e.target.value)
                        }
                        onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Fatty Liver Diagnostic Modality Free Text', fControlName: 'fattyLiverDiagnosticFreeText', value: fattyLiverDiagnosticFreeText })}
                        className="form-control"
                        type="text"
                      ></textarea>
                    </div>
                    <div className="container-width" style={{ width: '100%' }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Cirrhosis Status
                          <button type="btn btn-primary" className={isCommentExist('section8', 'cirrhosisStatusValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'cirrhosisStatusValue', value: cirrhosisStatusValue, section: 'section8' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="gap"
                          required
                          id="cirrhosis-status-yes"
                          checked={cirrhosisStatusValue === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setCirrhosisStatusValue(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Cirrhosis Status', fControlName: 'cirrhosisStatusValue', value: cirrhosisStatusValue })}
                          name="cirrhosis-status-CLD"
                          type="radio"
                        />
                        <label className="cirrhosis" htmlFor="cirrhosis-status-yes">
                          Yes
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
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
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Cirrhosis Status', fControlName: 'cirrhosisStatusValue', value: cirrhosisStatusValue })}
                          name="cirrhosis-status-CLD"
                          type="radio"
                        />

                        <label className="cirrhosis" htmlFor="cirrhosis-status-no">
                          No
                        </label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
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
                          onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Cirrhosis Status', fControlName: 'cirrhosisStatusValue', value: cirrhosisStatusValue })}
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
                        <label className="label-txt" style={{ fontWeight: 600 }}>Mittal's Criteria
                          <button type="btn btn-primary" className={isCommentExist('section8', 'mittalCriteriaValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'mittalCriteriaValue', value: mittalCriteriaValue, section: 'section8' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required
                            id="mital-criteria-a"
                            disabled={
                              cirrhosisStatusValue !== "Yes" || role === "ROLE_REVIEWER"
                            }
                            checked={
                              mittalCriteriaValue ===
                              "level 1 evidence (very high probability) of no cirrhosis"
                            }
                            value={
                              "level 1 evidence (very high probability) of no cirrhosis"
                            }
                            onChange={(e) => setMittalCriteriaValue(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Mittals Criteria', fControlName: 'mittalCriteriaValue', value: mittalCriteriaValue })}
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
                            disabled={
                              cirrhosisStatusValue !== "Yes" || role === "ROLE_REVIEWER"
                            }
                            id="mital-criteria-b"
                            checked={
                              mittalCriteriaValue ===
                              "level 2 evidence (high probability) of no cirrhosis, which lacks histology but is based on imaging and laboratory criteria"
                            }
                            value={
                              "level 2 evidence (high probability) of no cirrhosis, which lacks histology but is based on imaging and laboratory criteria"
                            }
                            onChange={(e) => setMittalCriteriaValue(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Mittals Criteria', fControlName: 'mittalCriteriaValue', value: mittalCriteriaValue })}
                            name="mittal-criteria"
                            type="radio"
                          />
                          <label htmlFor="mital-criteria-b" className="mL10 mt-2">
                            (b) Level 2 Evidence (high probability) of no cirrhosis, which lacks histology but is based on imaging and
                            laboratory criteria
                          </label>
                        </div>
                        <div className="mittal-bottom inlineFlex">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={
                              cirrhosisStatusValue !== "Yes" || role === "ROLE_REVIEWER"
                            }
                            id="mital-criteria-c"
                            checked={
                              mittalCriteriaValue ===
                              "confirmed cirrhosis, which is based on histological, imaging, clinical or laboratory criteria"
                            }
                            value={
                              "confirmed cirrhosis, which is based on histological, imaging, clinical or laboratory criteria"
                            }
                            onChange={(e) => setMittalCriteriaValue(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Mittals Criteria', fControlName: 'mittalCriteriaValue', value: mittalCriteriaValue })}
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
                              cirrhosisStatusValue !== "Unknown/unclassified" ||
                              role === "ROLE_REVIEWER"
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
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Mittals Criteria', fControlName: 'mittalCriteriaValue', value: mittalCriteriaValue })}
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
                        <label className="label-txt" style={{ fontWeight: 600 }}>Underlying Etiology
                          <button type="btn btn-primary" className={isCommentExist('section8', 'underlyingEtiologyValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue, section: 'section8' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!underlyingEtiologyValue.length}
                            disabled={role === "ROLE_REVIEWER"}
                            id="underlying-hcv"
                            checked={underlyingEtiologyValue.includes(
                              "HCV (Hepatitis C virus)"
                            )}
                            // value={"HCV (Hepatitis C virus)"}
                            onChange={() =>
                              handleUnderlyingEtiology("HCV (Hepatitis C virus)")
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!underlyingEtiologyValue.length}
                            id="underlying-hbv"
                            checked={underlyingEtiologyValue.includes(
                              "HBV (Hepatitis B virus)"
                            )}
                            // value={"HBV (Hepatitis B virus)"}
                            onChange={() =>
                              handleUnderlyingEtiology("HBV (Hepatitis B virus)")
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!underlyingEtiologyValue.length}
                            id="underlying-alcohol"
                            checked={underlyingEtiologyValue.includes("Alcohol")}
                            // value={"Alcohol"}
                            onChange={() => handleUnderlyingEtiology("Alcohol")}
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
                            name="underlying-etiology"
                            type="checkbox"
                          />
                          <label htmlFor="underlying-alcohol" className="mL5">Alcohol</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            required={!underlyingEtiologyValue.length}
                            id="underlying-nafld"
                            checked={underlyingEtiologyValue.includes(
                              "NAFLD (Non-alcoholic fatty liver disease)"
                            )}
                            // value={"NAFLD (Non-alcoholic fatty liver disease)"}
                            onChange={() =>
                              handleUnderlyingEtiology(
                                "NAFLD (Non-alcoholic fatty liver disease)"
                              )
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!underlyingEtiologyValue.length}
                            id="underlying-aih"
                            checked={underlyingEtiologyValue.includes(
                              "AIH (Autoimmune hepatitis)"
                            )}
                            // value={"AIH (Autoimmune hepatitis)"}
                            onChange={() =>
                              handleUnderlyingEtiology("AIH (Autoimmune hepatitis)")
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!underlyingEtiologyValue.length}
                            id="underlying-pbc"
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
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!underlyingEtiologyValue.length}
                            id="underlying-psc"
                            checked={underlyingEtiologyValue.includes(
                              "PSC (Primary sclerosing cholangitis)"
                            )}
                            // value={"PSC (Primary sclerosing cholangitis)"}
                            onChange={() =>
                              handleUnderlyingEtiology(
                                "PSC (Primary sclerosing cholangitis)"
                              )
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            id="underlying-hemochromatosis"
                            required={!underlyingEtiologyValue.length}
                            checked={underlyingEtiologyValue.includes(
                              "Hemochromatosis"
                            )}
                            // value={"Hemochromatosis"}
                            onChange={() =>
                              handleUnderlyingEtiology("Hemochromatosis")
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!underlyingEtiologyValue.length}
                            id="underlying-alpha-1"
                            checked={underlyingEtiologyValue.includes(
                              "Alpha 1 antitrypsin deficiency"
                            )}
                            // value={"Alpha 1 antitrypsin deficiency"}
                            onChange={() =>
                              handleUnderlyingEtiology(
                                "Alpha 1 antitrypsin deficiency"
                              )
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!underlyingEtiologyValue.length}
                            id="underlying-other-etiologies"
                            checked={underlyingEtiologyValue.includes(
                              "Other etiologie"
                            )}
                            // value={"Other etiologie"}
                            onChange={() =>
                              handleUnderlyingEtiology("Other etiologie")
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
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
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Underlying Etiology', fControlName: 'underlyingEtiologyValue', value: underlyingEtiologyValue })}
                            name="underlying-etiology"
                            type="checkbox"
                          />

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
                          <button type="btn btn-primary" className={isCommentExist('section8', 'etiologyCirrhosisFreeValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'etiologyCirrhosisFreeValue', value: etiologyCirrhosisFreeValue, section: 'section8' })}></button>
                        </label>
                      </div>
                      <textarea
                        onKeyDown={handleKeyPress}
                        required
                        disabled={role === "ROLE_REVIEWER"}
                        maxLength={100}
                        id="etiology-cirrhosis"
                        value={etiologyCirrhosisFreeValue}
                        onChange={(e) =>
                          setEtiologyCirrhosisFreeValue(e.target.value)
                        }
                        onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Etiology of Cirrhosis Free Text', fControlName: 'etiologyCirrhosisFreeValue', value: etiologyCirrhosisFreeValue })}
                        type="text"
                        className="form-control"
                      ></textarea>
                    </div>
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Complications (at the time of HCC diagnosis)
                          <button type="btn btn-primary" className={isCommentExist('section8', 'complicationCLD') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'complicationCLD', value: complicationCLD, section: 'section8' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            required={!complicationCLD.length}
                            id="complications-ascites"
                            checked={complicationCLD.includes("Ascites")}
                            // value={"Ascites"}
                            onChange={() => handleComplicationCLD("Ascites")}
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Complications (at the time of HCC diagnosis)', fControlName: 'complicationCLD', value: complicationCLD })}
                            name="complication"
                            type="checkbox"
                          />
                          <label htmlFor="complications-ascites" className="mL5">Ascites</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            required={!complicationCLD.length}
                            id="complications-encep"
                            checked={complicationCLD.includes("Encephalopathy")}
                            // value={"Encephalopathy"}
                            onChange={() => handleComplicationCLD("Encephalopathy")}
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Complications (at the time of HCC diagnosis)', fControlName: 'complicationCLD', value: complicationCLD })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!complicationCLD.length}
                            id="complications-varices"
                            checked={complicationCLD.includes("Varices")}
                            // value={"Varices"}
                            onChange={() => handleComplicationCLD("Varices")}
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Complications (at the time of HCC diagnosis)', fControlName: 'complicationCLD', value: complicationCLD })}
                            name="complication"
                            type="checkbox"
                          />
                          <label htmlFor="complications-varices" className="mL5">Varices</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            required={!complicationCLD.length}
                            id="complications-sbp"
                            checked={complicationCLD.includes(
                              "SBP (Spontaneous Bacteria Peritonitis)"
                            )}
                            // value={"SBP (Spontaneous Bacteria Peritonitis)"}
                            onChange={() =>
                              handleComplicationCLD(
                                "SBP (Spontaneous Bacteria Peritonitis)"
                              )
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Complications (at the time of HCC diagnosis)', fControlName: 'complicationCLD', value: complicationCLD })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!complicationCLD.length}
                            id="complications-other"
                            checked={complicationCLD.includes(
                              "Other (renal failure, etc)"
                            )}
                            // value={"Other (renal failure, etc)"}
                            onChange={() =>
                              handleComplicationCLD("Other (renal failure, etc)")
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Complications (at the time of HCC diagnosis)', fControlName: 'complicationCLD', value: complicationCLD })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!complicationCLD.length}
                            id="complications-no-complication"
                            checked={complicationCLD.includes(
                              "No complications occurred"
                            )}
                            // value={"No complications occurred"}
                            onChange={() =>
                              handleComplicationCLD("No complications occurred")
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Complications (at the time of HCC diagnosis)', fControlName: 'complicationCLD', value: complicationCLD })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!complicationCLD.length}
                            id="complications-information"
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
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Complications (at the time of HCC diagnosis)', fControlName: 'complicationCLD', value: complicationCLD })}
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
                            disabled={role === "ROLE_REVIEWER"}
                            required={!complicationCLD.length}
                            id="complications-portal"
                            checked={complicationCLD.includes(
                              "Portal vein thrombosis"
                            )}
                            // value={"Portal vein thrombosis"}
                            onChange={() =>
                              handleComplicationCLD("Portal vein thrombosis")
                            }
                            onBlur={() => handleAuditDetails({ id: 8, name: 'Chronic Liver Disease (CLD)Etiology', fName: 'Complications (at the time of HCC diagnosis)', fControlName: 'complicationCLD', value: complicationCLD })}
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
                {hccOutcome ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={hccOutcome ? "study-data" : ""}>
              <Fade>
                <div className="card p-3">
                  <div className="container-width-for-chronic">
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Treatment Modalities
                        <button type="btn btn-primary" className={isCommentExist('section9', 'hccOutcomeValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hccOutcomeValue', value: hccOutcomeValue, section: 'section9' })}></button></label>
                    </div>
                    <div className="cols-m-8">
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          required={!hccOutcomeValue.length}
                          disabled={role === "ROLE_REVIEWER"}
                          id="hcc-resection"
                          checked={hccOutcomeValue.includes("Resection")}
                          // value={"Resection"}
                          onChange={() => handleHccOutComeValue("Resection")}
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-resection" className="mL5">Resection</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          required={!hccOutcomeValue.length}
                          id="hcc-liver-transplatation"
                          checked={hccOutcomeValue.includes(
                            "Liver transplantation"
                          )}
                          // value={"Liver transplantation"}
                          onChange={() =>
                            handleHccOutComeValue("Liver transplantation")
                          }
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
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
                          required={!hccOutcomeValue.length}
                          id="hcc-catheter"
                          disabled={role === "ROLE_REVIEWER"}
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
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
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
                          required={!hccOutcomeValue.length}
                          id="hcc-sorafenib"
                          disabled={role === "ROLE_REVIEWER"}
                          checked={hccOutcomeValue.includes("Sorafenib")}
                          // value={"Sorafenib"}
                          onChange={() => handleHccOutComeValue("Sorafenib")}
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-sorafenib" className="mL5">Sorafenib</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          required={!hccOutcomeValue.length}
                          id="hcc-radiation"
                          checked={hccOutcomeValue.includes("Radiation(SBRT)")}
                          // value={"Radiation(SBRT)"}
                          onChange={() => handleHccOutComeValue("Radiation(SBRT)")}
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-radiation" className="mL5">Radiation(SBRT)</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          required={!hccOutcomeValue.length}
                          id="hcc-rfa"
                          checked={hccOutcomeValue.includes("RFA ablation")}
                          // value={"RFA ablation"}
                          onChange={() => handleHccOutComeValue("RFA ablation")}
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
                          name="treatment-modalities-hcc"
                          type="checkbox"
                        />
                        <label htmlFor="hcc-rfa" className="mL5">RFA Ablation</label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          required={!hccOutcomeValue.length}
                          disabled={role === "ROLE_REVIEWER"}
                          id="hcc-palliative"
                          checked={hccOutcomeValue.includes(
                            "Palliative/hospice care"
                          )}
                          // value={"Palliative/hospice care"}
                          onChange={() =>
                            handleHccOutComeValue("Palliative/hospice care")
                          }
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
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
                          disabled={role === "ROLE_REVIEWER"}
                          required={!hccOutcomeValue.length}
                          id="hcc-other"
                          checked={hccOutcomeValue.includes(
                            "Other (specify in freetext)"
                          )}
                          // value={"Other (specify in freetext)"}
                          name="treatment-modalities-hcc"
                          onChange={() => {
                            handleHccOutComeValue("Other (specify in freetext)");
                            setTreamentModalitiesHCC("");
                          }}
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
                          type="checkbox"
                        />
                        <label htmlFor="hcc-other" className="mL5">
                          Other (specify in freetext)
                        </label>
                      </div>
                      <div className="mittal-bottom">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          required={!hccOutcomeValue.length}
                          id="hcc-none"
                          checked={hccOutcomeValue.includes(
                            "None (if patient was too sick, refused treatment,etc.)"
                          )}
                          // value={
                          //   "None (if patient was too sick, refused treatment,etc.)"
                          // }
                          onChange={() =>
                            handleHccOutComeValue(
                              "None (if patient was too sick, refused treatment,etc.)"
                            )
                          }
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
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
                          disabled={role === "ROLE_REVIEWER"}
                          required={!hccOutcomeValue.length}
                          id="hcc-unknown"
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
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
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
                          disabled={role === "ROLE_REVIEWER"}
                          required={!hccOutcomeValue.length}
                          id="hcc-microwave"
                          checked={hccOutcomeValue.includes("Microwave ablation")}
                          // value={"Microwave ablation"}
                          onChange={() =>
                            handleHccOutComeValue("Microwave ablation")
                          }
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'hccOutcomeValue', value: hccOutcomeValue })}
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
                        <button type="btn btn-primary" className={isCommentExist('section9', 'treamentModalitiesHCC') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'treamentModalitiesHCC', value: treamentModalitiesHCC, section: 'section9' })}></button>
                      </label>
                    </div>
                    <textarea
                      onKeyDown={handleKeyPress}
                      required
                      disabled={
                        !hccOutcomeValue.includes("Other (specify in freetext)") ||
                        role === "ROLE_REVIEWER"
                      }
                      maxLength={100}
                      id="treatment-explain-free"
                      value={treamentModalitiesHCC}
                      onChange={(e) => setTreamentModalitiesHCC(e.target.value)}
                      onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Treatment Modalities', fControlName: 'treamentModalitiesHCC', value: treamentModalitiesHCC })}
                      type="text"
                      rows={1}
                      className="form-control"
                    ></textarea>
                  </div>
                  <div>
                    <h1 style={{ fontSize: 14 }}>If resection was performed:</h1>
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Stage of Fibrosis in Background Liver
                          <button type="btn btn-primary" className={isCommentExist('section9', 'resectionPerformed') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'resectionPerformed', value: resectionPerformed, section: 'section9' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required
                            disabled={
                              !hccOutcomeValue.includes("Resection") ||
                              role === "ROLE_REVIEWER"
                            }
                            id="hcc-performed-none"
                            checked={resectionPerformed === "None/F0"}
                            value={"None/F0"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Background Liver', fControlName: 'resectionPerformed', value: resectionPerformed })}
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-none" className="mL5">None/F0</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={
                              !hccOutcomeValue.includes("Resection") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={resectionPerformed === "Mild/stage 1/F1"}
                            value={"Mild/stage 1/F1"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Background Liver', fControlName: 'resectionPerformed', value: resectionPerformed })}
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
                            disabled={
                              !hccOutcomeValue.includes("Resection") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={resectionPerformed === "Moderate/stage 2/F2"}
                            value={"Moderate/stage 2/F2"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Background Liver', fControlName: 'resectionPerformed', value: resectionPerformed })}
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
                            disabled={
                              !hccOutcomeValue.includes("Resection") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={
                              resectionPerformed === "Bridiging fibrosis/stage 3F3"
                            }
                            value={"Bridiging fibrosis/stage 3F3"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Background Liver', fControlName: 'resectionPerformed', value: resectionPerformed })}
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
                            disabled={
                              !hccOutcomeValue.includes("Resection") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={resectionPerformed === "Cirrhosis/stage 4/F4"}
                            value={"Cirrhosis/stage 4/F4"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Background Liver', fControlName: 'resectionPerformed', value: resectionPerformed })}
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
                            disabled={
                              !hccOutcomeValue.includes("Resection") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={resectionPerformed === "Unknown"}
                            value={"Unknown"}
                            onChange={(e) => setResectionPerformed(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Background Liver', fControlName: 'resectionPerformed', value: resectionPerformed })}
                            name="background liver-hcc"
                            type="radio"
                          />
                          <label htmlFor="hcc-performed-unknown" className="mL5">Unknown</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 style={{ fontSize: 14 }}>
                      If liver transplant was performed:
                    </h1>
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Stage of Fibrosis in Explanted Liver
                          <button type="btn btn-primary" className={isCommentExist('section9', 'liverTransplantValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'liverTransplantValue', value: liverTransplantValue, section: 'section9' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required
                            id="liver-transplant-none"
                            disabled={
                              !hccOutcomeValue.includes("Liver transplantation") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={liverTransplantValue === "None/F0"}
                            value={"None/F0"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Explanted Liver', fControlName: 'liverTransplantValue', value: liverTransplantValue })}
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
                              !hccOutcomeValue.includes("Liver transplantation") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={liverTransplantValue === "Mild/stage 1/F1"}
                            value={"Mild/stage 1/F1"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Explanted Liver', fControlName: 'liverTransplantValue', value: liverTransplantValue })}
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
                              !hccOutcomeValue.includes("Liver transplantation") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={liverTransplantValue === "Moderate/stage 2/F2"}
                            value={"Moderate/stage 2/F2"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Explanted Liver', fControlName: 'liverTransplantValue', value: liverTransplantValue })}
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
                              !hccOutcomeValue.includes("Liver transplantation") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={
                              liverTransplantValue ===
                              "Bridiging fibrosis/stage 3F3"
                            }
                            value={"Bridiging fibrosis/stage 3F3"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Explanted Liver', fControlName: 'liverTransplantValue', value: liverTransplantValue })}
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
                              !hccOutcomeValue.includes("Liver transplantation") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={
                              liverTransplantValue === "Cirrhosis/stage 4/F4"
                            }
                            value={"Cirrhosis/stage 4/F4"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Explanted Liver', fControlName: 'liverTransplantValue', value: liverTransplantValue })}
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
                              !hccOutcomeValue.includes("Liver transplantation") ||
                              role === "ROLE_REVIEWER"
                            }
                            checked={liverTransplantValue === "Unknown"}
                            value={"Unknown"}
                            onChange={(e) =>
                              setLiverTransplantValue(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Stage of Fibrosis in Explanted Liver', fControlName: 'liverTransplantValue', value: liverTransplantValue })}
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
                      <label className="label-txt" style={{ fontWeight: 600 }}>Recurrence ?
                        <button type="btn btn-primary" className={isCommentExist('section9', 'recurrenceValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'recurrenceValue', value: recurrenceValue, section: 'section9' })}></button></label>
                    </div>
                    <div className="col-sm-8">
                      {/* <div className="gaps-recurrence"> */}
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        disabled={role === "ROLE_REVIEWER"}
                        className="margin-right-radio"
                        id="recurrence-yes"
                        checked={recurrenceValue === "Yes once"}
                        value={"Yes once"}
                        onChange={(e) => setRecurrenceValue(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Recurrence', fControlName: 'recurrenceValue', value: recurrenceValue })}
                        name="Recurrence"
                        type="radio"
                      />
                      <label htmlFor="recurrence-yes">Yes Once</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="margin-right-radio mL5"
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
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Recurrence', fControlName: 'recurrenceValue', value: recurrenceValue })}
                        name="Recurrence"
                        type="radio"
                      />
                      <label htmlFor="recurrence-yes-more">
                        Yes More Than Once
                      </label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="margin-right-radio mL5"
                        id="recurrence-no"
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
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Recurrence', fControlName: 'recurrenceValue', value: recurrenceValue })}
                        name="Recurrence"
                        type="radio"
                      />
                      <label htmlFor="recurrence-no">No</label>
                      <div>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="margin-right-radio"
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
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Recurrence', fControlName: 'recurrenceValue', value: recurrenceValue })}
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
                        <label className="label-txt" style={{ fontWeight: 600 }}>Date of First Recurrence
                          <button type="btn btn-primary" className={isCommentExist('section9', 'selectedDateOfFirstRecurrence') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'selectedDateOfFirstRecurrence', value: selectedDateOfFirstRecurrence, section: 'section9' })}></button></label></div>
                      <div className="col-sm-3">
                        <input
                          onKeyDown={handleKeyPress}
                          required={recurrenceValue === "Yes once"}
                          disabled={
                            (recurrenceValue !== "Yes once" && recurrenceValue !== "Yes more than once") || role === "ROLE_REVIEWER"
                          }
                          type="date"
                          value={selectedDateOfFirstRecurrence}
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            setSelectedDateOfFirstRecurrence(formattedDate);
                          }}
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Date of First Recurrence', fControlName: 'selectedDateOfFirstRecurrence', value: selectedDateOfFirstRecurrence })}
                          className="form-control"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={selectedDateOfFirstRecurrence}
                          disabled={
                            (recurrenceValue !== "Yes once" && recurrenceValue !== "Yes more than once") || role === "ROLE_REVIEWER"
                          }
                          onChange={date => setSelectedDateOfFirstRecurrence(date)}
                          startDate={selectedDateOfFirstRecurrence}
                          dateFormat={'dd/MMM/yyyy'}
                          onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Date of First Recurrence', fControlName: 'selectedDateOfFirstRecurrence', value: selectedDateOfFirstRecurrence })}
                          className="form-control date"
                          placeholderText="DD/MMM/YYYY"
                        /> */}
                        <label style={{ color: 'black' }}>(First recurrence only)</label>
                      </div>
                    </div>
                  </div>
                  <div className="container-width" style={{ width: '100%' }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Survival Status
                        <button type="btn btn-primary" className={isCommentExist('section9', 'survivalStatusValue') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'survivalStatusValue', value: survivalStatusValue, section: 'section9' })}></button></label>
                    </div>
                    <div className="col-sm-8">
                      {/* <div className="container-width"> */}
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
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
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Survival Status', fControlName: 'survivalStatusValue', value: survivalStatusValue })}
                        name="survival status"
                        type="radio"
                      />
                      <label htmlFor="survival-status-alive">Alive</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="margin-right-radio mL5"
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
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Survival Status', fControlName: 'survivalStatusValue', value: survivalStatusValue })}
                        name="survival status"
                        type="radio"
                      />
                      <label htmlFor="survival-status-deceased">Deceased</label>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        className="margin-right-radio mL5"
                        id="survival-status-unknown"
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
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Survival Status', fControlName: 'survivalStatusValue', value: survivalStatusValue })}
                        name="survival status"
                        type="radio"
                      />
                      <label htmlFor="survival-status-unknown">Unknown</label>
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="d-subject" style={{ width: '100%' }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Date of Death
                        <button type="btn btn-primary" className={isCommentExist('section9', 'selectedDateOfDeath') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'selectedDateOfDeath', value: selectedDateOfDeath, section: 'section9' })}></button></label>
                    </div>
                    <div className="container-width" style={{ display: 'inline-flex' }}>
                      <input
                        onKeyDown={handleKeyPress}
                        required={survivalStatusValue === "Deceased"}
                        disabled={
                          survivalStatusValue !== "Deceased" ||
                          dateOfDeathUnknown === "Unknown" ||
                          role === "ROLE_REVIEWER"
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
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Date of Death', fControlName: 'selectedDateOfDeath', value: selectedDateOfDeath })}
                        className="form-control"
                        style={{ height: 'fit-content' }}
                      />
                      {/* <DatePicker
                        wrapperClassName='w-full'
                        selected={selectedDateOfDeath}
                        disabled={
                          survivalStatusValue !== "Deceased" ||
                          dateOfDeathUnknown === "Unknown" || role === "ROLE_REVIEWER"
                        }
                        onChange={date => setSelectedDateOfDeath(date)}
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Date of Death', fControlName: 'selectedDateOfDeath', value: selectedDateOfDeath })}
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
                        disabled={
                          role === "ROLE_REVIEWER" ||
                          survivalStatusValue !== "Deceased" ||
                          dateOfDeathUnknown === "Unknown"
                        }
                        checked={dateOfDeathUnknown === "Unknown"}
                        onChange={(e) => {
                          if (dateOfDeathUnknown === "Unknown") {
                            setSelectedDateOfDeath("");
                            // setSurvivalStatusValue("");
                          } else {
                            setSelectedDateOfDeath("");
                            // setSurvivalStatusValue("");
                          }
                          setDateOfDeathUnkown(e.target.value);
                        }}
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Date of Death', fControlName: 'dateOfDeathUnknown', value: dateOfDeathUnknown })}
                        className="chronicliver-ww1 mL5"
                        type="radio"
                      />
                      <label className="mL5" style={{ marginTop: 5, marginLeft: 5 }}>Unknown</label>
                    </div>
                  </div>
                  <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Date of last contact (if patient is alive or dead
                        but unknown date of death))
                        <button type="btn btn-primary" className={isCommentExist('section9', 'selectedDateOfLastContact') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'selectedDateOfLastContact', value: selectedDateOfLastContact, section: 'section9' })}></button></label>
                    </div>
                    <div className="col-sm-3">
                      <input
                        onKeyDown={handleKeyPress}
                        required
                        type="date"
                        disabled={
                          lastContactUnknown === "Unknown" || role === "ROLE_REVIEWER"
                        }
                        value={selectedDateOfLastContact}
                        onChange={(e) => {
                          const inputDate = e.target.value;
                          const [year, month, day] = inputDate.split("-");
                          const limitedYear = year.slice(0, 4);
                          const formattedDate = `${limitedYear}-${month}-${day}`;
                          setSelectedDateOfLastContact(formattedDate);
                        }}
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Date of Last Contact(if patient is alive or dead)', fControlName: 'selectedDateOfLastContact', value: selectedDateOfLastContact })}
                        className="form-control"
                      />
                      {/* <DatePicker
                        wrapperClassName='w-full'
                        selected={selectedDateOfLastContact}
                        disabled={lastContactUnknown === "Unknown" || role === "ROLE_REVIEWER"}
                        onChange={date => setSelectedDateOfLastContact(date)}
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Date of Last Contact(if patient is alive or dead)', fControlName: 'selectedDateOfLastContact', value: selectedDateOfLastContact })}
                        startDate={selectedDateOfLastContact}
                        dateFormat={'dd/MMM/yyyy'}
                        className="form-control date"
                        placeholderText="DD/MMM/YYYY"
                      /> */}
                    </div>
                    <label style={{ marginLeft: 20, marginTop: 5 }}>or</label>
                    <input
                      onKeyDown={handleKeyPress}
                      disabled={role === "ROLE_REVIEWER"}
                      value={"Unknown"}
                      checked={lastContactUnknown === "Unknown"}
                      onChange={(e) => {
                        if (lastContactUnknown === "Unknown") {
                          setSelectedDateOfLastContact("");
                        } else {
                          setSelectedDateOfLastContact("");
                        }
                        setLastContactUnknown(e.target.value);
                      }}
                      onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Date of Last Contact(if patient is alive or dead)', fControlName: 'lastContactUnknown', value: lastContactUnknown })}
                      className="chronicliver-ww1 mL5"
                      type="radio"
                    />
                    <label className="mL5 mt-2">Unknown</label>
                  </div>
                  <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>
                        Recurrence-free Survival(days)
                        <button type="btn btn-primary" className={isCommentExist('section9', 'selectedDateOfRecurrenceFree') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'selectedDateOfRecurrenceFree', value: selectedDateOfRecurrenceFree, section: 'section9' })}></button>
                      </label>
                    </div>
                    <div className="container-width">
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
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
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Recurrence-free Survival(days)', fControlName: 'selectedDateOfRecurrenceFree', value: selectedDateOfRecurrenceFree })}
                        className="form-control"
                      />
                    </div>
                    <label style={{ color: 'black', marginLeft: "7px" }}>
                      (Date of first resection or liver transplant to date of first
                      recurrenct)
                    </label>
                  </div>
                  <div className="d-subject" style={{ width: '100%', marginTop: 10 }}>
                    <div className="col-sm-4">
                      <label className="label-txt" style={{ fontWeight: 600 }}>Overall Survival(days)
                        <button type="btn btn-primary" className={isCommentExist('section9', 'selectedDateOfOverallSurvival') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'selectedDateOfOverallSurvival', value: selectedDateOfOverallSurvival, section: 'section9' })}></button></label>
                    </div>
                    <div className="container-width">
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
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
                        onBlur={() => handleAuditDetails({ id: 9, name: 'HCC Outcome', fName: 'Overall Survival(days)', fControlName: 'selectedDateOfOverallSurvival', value: selectedDateOfOverallSurvival })}
                        className="form-control"
                      />
                    </div>
                    <label style={{ color: 'black', marginLeft: "7px" }}>
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
                {screenQuestion ? <ArrowDownward /> : <ArrowUpward />}
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
                          <button type="btn btn-primary" className={isCommentExist('section10', 'screeningQuestion') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'screeningQuestion', value: screeningQuestion, section: 'section10' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            className="screen-m"
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'How was the HCC Diagnosed?', fControlName: 'screeningQuestion', value: screeningQuestion })}
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
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'How was the HCC Diagnosed?', fControlName: 'screeningQuestion', value: screeningQuestion })}
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
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'How was the HCC Diagnosed?', fControlName: 'screeningQuestion', value: screeningQuestion })}
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
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'How was the HCC Diagnosed?', fControlName: 'screeningQuestion', value: screeningQuestion })}
                            name="screen question"
                            type="radio"
                          />
                          <label htmlFor="screen-question-na">Unknown</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            className="screen-m"
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="screen-question-other"
                            checked={screeningQuestion === "Other"}
                            value={"Other"}
                            onChange={(e) => {
                              setScreeningQuestionValue(e.target.value);
                            }}
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'How was the HCC Diagnosed?', fControlName: 'screeningQuestion', value: screeningQuestion })}
                            name="screen question"
                            type="radio"
                          />
                          <label htmlFor="screen-question-other">Other, If Others, Pls Specify</label>
                          <textarea
                            onKeyDown={handleKeyPress}
                            maxLength={50}
                            rows={1}
                            disabled={
                              screeningQuestion !== "Other" || role === "ROLE_REVIEWER"
                            }
                            value={screeningQuestionNa}
                            onChange={(e) => setScreeningQuestionNa(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'How was the HCC Diagnosed?', fControlName: 'screeningQuestionNa', value: screeningQuestionNa })}
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Any Method of Screening<br /> Found within 2 Years Before HCC diagnosis?
                          <button type="btn btn-primary" className={isCommentExist('section10', 'screening2Years') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'screening2Years', value: screening2Years, section: 'section10' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          value={"Yes"}
                          checked={screening2Years === "Yes"}
                          onChange={(e) => setScreening2Years(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Any Method of Screening Found within 2 Years Before', fControlName: 'screening2Years', value: screening2Years })}
                          id="method2-yes"
                          className="radio-right-gap"
                          name="any-method2"
                          type="radio"
                        />
                        <label htmlFor="method2-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          value={"No"}
                          checked={screening2Years === "No"}
                          onChange={(e) => setScreening2Years(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Any Method of Screening Found within 2 Years Before', fControlName: 'screening2Years', value: screening2Years })}
                          id="method2-no"
                          className="radio-right-gap"
                          name="any-method2"
                          type="radio"
                          style={{ marginLeft: 20 }}
                        />
                        <label htmlFor="method2-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          value={"Unknown"}
                          checked={screening2Years === "Unknown"}
                          onChange={(e) => setScreening2Years(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Any Method of Screening Found within 2 Years Before', fControlName: 'screening2Years', value: screening2Years })}
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
                          Any Method of Screening<br /> Found within 1 Year Before HCC diagnosis?
                          <button type="btn btn-primary" className={isCommentExist('section10', 'screening1Year') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'screening1Year', value: screening1Year, section: 'section10' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="method1-yes"
                          value={"Yes"}
                          checked={screening1Year === "Yes"}
                          onChange={(e) => setScreening1Year(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Any Method of Screening Found within 1 Year Before', fControlName: 'screening1Year', value: screening1Year })}
                          className="radio-right-gap"
                          name="any-method1"
                          type="radio"
                        />
                        <label htmlFor="method1-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="method1-no"
                          value={"No"}
                          checked={screening1Year === "No"}
                          onChange={(e) => setScreening1Year(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Any Method of Screening Found within 1 Year Before', fControlName: 'screening1Year', value: screening1Year })}
                          className="radio-right-gap"
                          name="any-method1"
                          type="radio"
                          style={{ marginLeft: 20 }}
                        />
                        <label htmlFor="method1-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="method1-un"
                          value={"Unknown"}
                          checked={screening1Year === "Unknown"}
                          onChange={(e) => setScreening1Year(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Any Method of Screening Found within 1 Year Before', fControlName: 'screening1Year', value: screening1Year })}
                          className="radio-right-gap"
                          name="any-method1"
                          type="radio"
                          style={{ marginLeft: 20 }}
                        />
                        <label htmlFor="method1-un">Unknown</label>
                      </div>
                    </div>
                    {/* ========= */}
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Method Of Screening ?
                          <button type="btn btn-primary" className={isCommentExist('section10', 'methodOfScreening') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'methodOfScreening', value: methodOfScreening, section: 'section10' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Method Of Screening ?', fControlName: 'methodOfScreening', value: methodOfScreening })}
                            type="radio"
                          />
                          <label htmlFor="method-screening-ct" className="mL5">
                            CT (Computed Tomography)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Method Of Screening ?', fControlName: 'methodOfScreening', value: methodOfScreening })}
                            type="radio"
                          />
                          <label htmlFor="method-screening-mri" className="mL5">
                            MRI (Magnetic Resonance Imaging)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Method Of Screening ?', fControlName: 'methodOfScreening', value: methodOfScreening })}
                            type="radio"
                          />
                          <label htmlFor="screen-question-us" className="mL5">
                            US (Ultra-Sound)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Method Of Screening ?', fControlName: 'methodOfScreening', value: methodOfScreening })}
                            type="radio"
                          />
                          <label htmlFor="method-screening-AFP" className="mL5">
                            AFP (Alpha-fetoprotein)
                          </label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Method Of Screening ?', fControlName: 'methodOfScreening', value: methodOfScreening })}
                            type="radio"
                          />
                          <label htmlFor="method-screening-un" className="mL5">Unknown</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="method-screening-other"
                            name="method-screening"
                            checked={methodOfScreening === "Other"}
                            value={"Other"}
                            onChange={(e) => setMethodOfScreening(e.target.value)}
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Method Of Screening ?', fControlName: 'methodOfScreening', value: methodOfScreening })}
                            type="radio"
                          />
                          <label htmlFor="method-screening-other" className="mL5">Other, If Others, Pls Specify</label>
                          <textarea
                            onKeyDown={handleKeyPress}
                            required={methodOfScreening === "Other"}
                            disabled={
                              methodOfScreening !== "Other" || role === "ROLE_REVIEWER"
                            }
                            value={methodOfScreeningTxt}
                            maxLength={50}
                            onChange={(e) =>
                              setMethodOfScreeningTxt(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 10, name: 'Screening Question', fName: 'Method Of Screening ?', fControlName: 'methodOfScreeningTxt', value: methodOfScreeningTxt })}
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
                  {hivSpecificButton ? <ArrowDownward /> : <ArrowUpward />}
                </button>
              </div>

              <div className={hivSpecificButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="container-width-for-chronic">
                      <div className="col-sm-4">
                        <label className="label-txt" htmlFor="study-title" style={{ fontWeight: 600 }}>
                          History of HIV
                          <button type="btn btn-primary" className={isCommentExist('section11', 'historyHIV') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'historyHIV', value: historyHIV, section: 'section11' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          checked={historyHIV === "Yes"}
                          disabled={hivComorbidities !== "Yes" || role === "ROLE_REVIEWER"}
                          onChange={(e) => setHistoryHiv(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'History of HIV', fControlName: 'historyHIV', value: historyHIV })}
                          value={"Yes"}
                          name="history-of-hiv"
                          id="history-yes"
                          type="radio"
                        />
                        <label htmlFor="history-yes" className="mL5">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={hivComorbidities !== "Yes" || role === "ROLE_REVIEWER"}
                          checked={historyHIV === "No"}
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
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'History of HIV', fControlName: 'historyHIV', value: historyHIV })}
                          value={"No"}
                          name="history-of-hiv" className="mL5"
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
                          <button type="btn btn-primary" className={isCommentExist('section11', 'yearOfHIVHCC') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yearOfHIVHCC', value: yearOfHIVHCC, section: 'section11' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-2">
                        <input
                          onKeyDown={handleKeyPress}
                          value={yearOfHIVHCC}
                          disabled={historyHIV !== "Yes" || role === "ROLE_REVIEWER"}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setYearOfHIVHCC(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'Year of HIV Diagnosis', fControlName: 'yearOfHIVHCC', value: yearOfHIVHCC })}
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
                          <button type="btn btn-primary" className={isCommentExist('section11', 'dateOfHIVDurationFrom') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'dateOfHIVDurationFrom', value: dateOfHIVDurationFrom, section: 'section11' })}></button>
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
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'Duration of HIV(years)', fControlName: 'dateOfHIVDurationFrom', value: dateOfHIVDurationFrom })}
                          disabled={historyHIV !== "Yes" || role === "ROLE_REVIEWER"}
                          className="form-control"
                          type="text"
                          style={{ height: 'fit-content', width: 130 }}
                        />
                        <label style={{ color: 'black', marginLeft: "7px" }}>
                          (From year of diagnosis of HIV to year of diagnosis of HCC)
                        </label>
                      </div>
                      {/* </div> */}
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label htmlFor="hiv-rna-level" className="label-txt" style={{ fontWeight: 600 }}>
                          HIV RNA Level (most recent)
                          <button type="btn btn-primary" className={isCommentExist('section11', 'hivRNAHCC') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hivRNAHCC', value: hivRNAHCC, section: 'section11' })}></button>
                        </label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        id="hiv-rna-level"
                        value={hivRNAHCC}
                        disabled={hivComorbidities !== "Yes" || role === "ROLE_REVIEWER"}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,10}$/.test(inputValue)) {
                            setHIVRNAHCC(e.target.value);
                          }
                        }}
                        onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'HIV RNA Level (most recent)', fControlName: 'hivRNAHCC', value: hivRNAHCC })}
                        className="form-control"
                        type="text"
                        style={{ width: 150 }}
                      />
                      <label className="mL5">copies/mL</label>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          If HIV RNA level is below<br /> lower limit of detection, (Fill the following)
                          <button type="btn btn-primary" className={isCommentExist('section11', 'belowRadioHCC') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'belowRadioHCC', value: belowRadioHCC, section: 'section11' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8" style={{ display: 'inline-flex' }}>
                        <input
                          onKeyDown={handleKeyPress}
                          // disabled={historyHIV !== "Yes"}
                          disabled={hivComorbidities !== "Yes" || role === "ROLE_REVIEWER"}
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
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'If HIV RNA Level is Below Lower Limit of Detect', fControlName: 'belowRadioHCC', value: belowRadioHCC })}
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
                            !belowRadioHCC.includes("Below Lower Limit of Detection") || role === "ROLE_REVIEWER"
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
                          <button type="btn btn-primary" className={isCommentExist('section11', 'hivCD4') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hivCD4', value: hivCD4, section: 'section11' })}></button>
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
                            hivCD4Nav === "NAV" ||
                            role === "ROLE_REVIEWER"
                          }
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setHIVCD4(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'CD4 (%) (Clusters of differentiation 4)', fControlName: 'hivCD4', value: hivCD4 })}
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
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'CD4 (%) (Clusters of differentiation 4) NAV', fControlName: 'hivCD4Nav', value: hivCD4Nav })}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            role === "ROLE_REVIEWER"
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
                          <button type="btn btn-primary" className={isCommentExist('section11', 'hivAbsoluteCD4') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hivAbsoluteCD4', value: hivAbsoluteCD4, section: 'section11' })}></button>
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
                            hivAbsoluteCD4Nav === "NAV" ||
                            role === "ROLE_REVIEWER"
                          }
                          value={hivAbsoluteCD4}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setHivAbsoluteCD4(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'Absolute CD4 (cells/uL)', fControlName: 'hivAbsoluteCD4', value: hivAbsoluteCD4 })}
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
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            role === "ROLE_REVIEWER"
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
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'Absolute CD4 (cells/uL) NAV', fControlName: 'hivAbsoluteCD4Nav', value: hivAbsoluteCD4Nav })}
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
                          <button type="btn btn-primary" className={isCommentExist('section11', 'hivCD4CellCount') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hivCD4CellCount', value: hivCD4CellCount, section: 'section11' })}></button>
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
                            hivCD4CellCountNav === "NAV" ||
                            role === "ROLE_REVIEWER"
                          }
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,4}$/.test(inputValue)) {
                              setHIVCD4CellCount(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'CD4 Cell Count Nadir (if known)', fControlName: 'hivCD4CellCount', value: hivCD4CellCount })}
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
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            role === "ROLE_REVIEWER"
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
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'CD4 Cell Count Nadir (if known) NAV', fControlName: 'hivCD4CellCountNav', value: hivCD4CellCountNav })}
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
                          <button type="btn btn-primary" className={isCommentExist('section11', 'hivInitialHIV1') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hivInitialHIV1', value: hivInitialHIV1, section: 'section11' })}></button>
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
                            hivInitialHIV1Nav === "NAV" ||
                            role === "ROLE_REVIEWER"
                          }
                          value={hivInitialHIV1}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,10}$/.test(inputValue)) {
                              setHivInitialHIV1(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'Initial HIV-1 RNA Level (if known)', fControlName: 'hivInitialHIV1', value: hivInitialHIV1 })}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            role === "ROLE_REVIEWER"
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
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'Initial HIV-1 RNA Level (if known) NAV', fControlName: 'hivInitialHIV1Nav', value: hivInitialHIV1Nav })}
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
                          <button type="btn btn-primary" className={isCommentExist('section11', 'maximumHIVRNA') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'maximumHIVRNA', value: maximumHIVRNA, section: 'section11' })}></button>
                        </label>
                      </div>
                      <div className="container-width">
                        <input
                          onKeyDown={handleKeyPress}
                          required={historyHIV === "Yes"}
                          value={maximumHIVRNA}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            maximumHIVRNANav === "NAV" ||
                            role === "ROLE_REVIEWER"
                          }
                          // disabled={historyHIV !== "Yes"}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,10}$/.test(inputValue)) {
                              setMaximumHIVRNA(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'Maximum HIV-1 RNA Level (if known)', fControlName: 'maximumHIVRNA', value: maximumHIVRNA })}
                          id="max-hiv"
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={
                            !belowRadioHCC.includes("Below Lower Limit of Detection") ||
                            role === "ROLE_REVIEWER"
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
                          onBlur={() => handleAuditDetails({ id: 11, name: 'HIV-Specific Lab Data within 6 months of HCC diagnosis', fName: 'Maximum HIV-1 RNA Level (if known) NAV', fControlName: 'maximumHIVRNANav', value: maximumHIVRNANav })}
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
                  {hepatitisCVirusButton ? <ArrowDownward /> : <ArrowUpward />}
                </button>
              </div>
              <div className={hepatitisCVirusButton ? "study-data" : ""}>
                <Fade>
                  <div className="card p-3">
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is Date of HCV Diagnosis Known?
                          <button type="btn btn-primary" className={isCommentExist('section12', 'isDateHCVDiagnosis') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'isDateHCVDiagnosis', value: isDateHCVDiagnosis, section: 'section12' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="is-date-hcv-yes"
                          checked={isDateHCVDiagnosis === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setIsDateHCVDiagnosis(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Is Date of HCV Diagnosis Known?', fControlName: 'isDateHCVDiagnosis', value: isDateHCVDiagnosis })}
                          name="Is date of HCV diagnosis known"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="is-date-hcv-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="is-date-hcv-no"
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
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Is Date of HCV Diagnosis Known?', fControlName: 'isDateHCVDiagnosis', value: isDateHCVDiagnosis })}
                          name="Is date of HCV diagnosis known"
                          type="radio"
                          className="chronicliver-ww margin-right-radio mL5"
                        />
                        <label htmlFor="is-date-hcv-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="is-date-hcv-unknown"
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
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Is Date of HCV Diagnosis Known?', fControlName: 'isDateHCVDiagnosis', value: isDateHCVDiagnosis })}
                          name="Is date of HCV diagnosis known"
                          type="radio"
                          className="chronicliver-ww margin-right-radio mL5"
                        />
                        <label htmlFor="is-date-hcv-unknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Date of HCV Diagnosis
                          <button type="btn btn-primary" className={isCommentExist('section12', 'dateOfHCVCVirus') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'dateOfHCVCVirus', value: dateOfHCVCVirus, section: 'section12' })}></button></label>
                      </div>
                      <div className="col-sm-3">
                        <input
                          onKeyDown={handleKeyPress}
                          required={isDateHCVDiagnosis === "Yes"}
                          disabled={isDateHCVDiagnosis !== "Yes" || role === "ROLE_REVIEWER"}
                          type="date"
                          value={dateOfHCVCVirus}
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            setDateOfHCVCVirus(formattedDate);
                          }}
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Date of HCV Diagnosis', fControlName: 'dateOfHCVCVirus', value: dateOfHCVCVirus })}
                          className="form-control"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={dateOfHCVCVirus}
                          disabled={isDateHCVDiagnosis !== "Yes" || role === "ROLE_REVIEWER"}
                          onChange={date => setDateOfHCVCVirus(date)}
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Date of HCV Diagnosis', fControlName: 'dateOfHCVCVirus', value: dateOfHCVCVirus })}
                          startDate={dateOfHCVCVirus}
                          dateFormat={'dd/MMM/yyyy'}
                          className="form-control date"
                          placeholderText="DD/MMM/YYYY"
                        /> */}
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is HCV Viral Load Known
                          <button type="btn btn-primary" className={isCommentExist('section12', 'isHCViralCVirus') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'isHCViralCVirus', value: isHCViralCVirus, section: 'section12' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="margin-right-radio"
                          id="hcv-load-yes"
                          checked={isHCViralCVirus === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setIsHCViralCVirus(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Is HCV Viral Load Known', fControlName: 'isHCViralCVirus', value: isHCViralCVirus })}
                          name="Is HCV viral load known"
                          type="radio"
                        />
                        <label htmlFor="hcv-load-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="hcv-load-no"
                          className="margin-right-radio mL5"
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
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Is HCV Viral Load Known', fControlName: 'isHCViralCVirus', value: isHCViralCVirus })}
                          name="Is HCV viral load known"
                          type="radio"
                        />
                        <label htmlFor="hcv-load-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="hcv-load-unknown"
                          className="margin-right-radio mL5"
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
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Is HCV Viral Load Known', fControlName: 'isHCViralCVirus', value: isHCViralCVirus })}
                          name="Is HCV viral load known"
                          type="radio"
                        />
                        <label htmlFor="hcv-load-unknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>HCV Viral Load at Time of HCC Diagnosis
                          <button type="btn btn-primary" className={isCommentExist('section12', 'HCVviralTimeOfHCCDiagnosis') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'HCVviralTimeOfHCCDiagnosis', value: HCVviralTimeOfHCCDiagnosis, section: 'section12' })}></button></label>
                      </div>
                      <div className="col-sm-3" style={{ display: 'inline-flex' }}>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={isHCViralCVirus !== "Yes" || role === "ROLE_REVIEWER"}
                          value={HCVviralTimeOfHCCDiagnosis}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,10}$/.test(inputValue)) {
                              setHCVviralTimeOfHCCDiagnosis(e.target.value);
                            }
                          }}
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Viral Load at Time of HCC Diagnosis', fControlName: 'HCVviralTimeOfHCCDiagnosis', value: HCVviralTimeOfHCCDiagnosis })}
                          type="text"
                          className="form-control"
                          style={{ height: 35 }}
                        />
                        <label className="mL5">IU/mL</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          <button type="btn btn-primary" className={isCommentExist('section12', 'hcvGenotype') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hcvGenotype', value: hcvGenotype, section: 'section12' })}></button>HCV Genotype</label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!hcvGenotype.length}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcvgenotype1a"
                            checked={hcvGenotype.includes("1a")}
                            // value={"1a"}
                            onChange={() => handleHCVGenotypeMultiselection("1a")}
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Genotype', fControlName: 'hcvGenotype', value: hcvGenotype })}
                            name="HCV genotype"
                            type="checkbox" className="mL5"
                          />
                          <label htmlFor="hcvgenotype1a" style={{ marginLeft: 5 }}>1a</label>
                          {/* </div> */}
                          {/* <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            required={!hcvGenotype.length}
                            id="hcvgenotype1b"
                            checked={hcvGenotype.includes("1b")}
                            // value={"1b"}
                            onChange={() => handleHCVGenotypeMultiselection("1b")}
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Genotype', fControlName: 'hcvGenotype', value: hcvGenotype })}
                            name="HCV genotype"
                            type="checkbox" className="mL5"
                          />
                          <label htmlFor="hcvgenotype1b" style={{ marginLeft: 5 }}>1b</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="1 unknown"
                            required={!hcvGenotype.length}
                            checked={hcvGenotype.includes("1 unknown")}
                            // value={"1 unknown"}
                            onChange={() =>
                              handleHCVGenotypeMultiselection("1 unknown")
                            }
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Genotype', fControlName: 'hcvGenotype', value: hcvGenotype })}
                            name="HCV genotype"
                            type="checkbox" className="mL5"
                          />
                          <label htmlFor="1 unknown" style={{ marginLeft: 5 }}>1 Unknown</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcvgenotype2"
                            required={!hcvGenotype.length}
                            checked={hcvGenotype.includes("2")}
                            // value={"2"}
                            onChange={() => handleHCVGenotypeMultiselection("2")}
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Genotype', fControlName: 'hcvGenotype', value: hcvGenotype })}
                            name="HCV genotype"
                            type="checkbox" className="mL5"
                          />
                          <label htmlFor="hcvgenotype2" style={{ marginLeft: 5 }}>2</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcvgenotype3"
                            required={!hcvGenotype.length}
                            checked={hcvGenotype.includes("3")}
                            // value={"3"}
                            onChange={() => handleHCVGenotypeMultiselection("3")}
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Genotype', fControlName: 'hcvGenotype', value: hcvGenotype })}
                            name="HCV genotype"
                            type="checkbox" className="mL5"
                          />
                          <label htmlFor="hcvgenotype3" style={{ marginLeft: 5 }}>3</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcvgenotype4"
                            required={!hcvGenotype.length}
                            checked={hcvGenotype.includes("4")}
                            // value={"4"}
                            onChange={() => handleHCVGenotypeMultiselection("4")}
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Genotype', fControlName: 'hcvGenotype', value: hcvGenotype })}
                            name="HCV genotype"
                            type="checkbox" className="mL5"
                          />
                          <label htmlFor="hcvgenotype4" style={{ marginLeft: 5 }}>4</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcvgenotype5"
                            required={!hcvGenotype.length}
                            checked={hcvGenotype.includes("5")}
                            // value={"5"}
                            onChange={() => handleHCVGenotypeMultiselection("5")}
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Genotype', fControlName: 'hcvGenotype', value: hcvGenotype })}
                            name="HCV genotype"
                            type="checkbox" className="mL5"
                          />
                          <label htmlFor="hcvgenotype5" style={{ marginLeft: 5 }}>5</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcvgenotype6"
                            required={!hcvGenotype.length}
                            checked={hcvGenotype.includes("6")}
                            // value={"6"}
                            onChange={() => handleHCVGenotypeMultiselection("6")}
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Genotype', fControlName: 'hcvGenotype', value: hcvGenotype })}
                            name="HCV genotype"
                            type="checkbox" className="mL5"
                          />
                          <label htmlFor="hcvgenotype6" style={{ marginLeft: 5 }}>6</label>
                          {/* </div>
                        <div className="mittal-bottom"> */}
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcvgenotypeunknown"
                            required={!hcvGenotype.length}
                            checked={hcvGenotype.includes("Unknown")}
                            // value={"Unknown"}
                            onChange={() =>
                              handleHCVGenotypeMultiselection("Unknown")
                            }
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Genotype', fControlName: 'hcvGenotype', value: hcvGenotype })}
                            name="HCV genotype"
                            type="checkbox" className="mL5"
                          />
                          <label htmlFor="hcvgenotypeunknown" style={{ marginLeft: 5 }}>Unknown</label>
                        </div>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Was HCV Treatment Received Before or After initial HCC diagnosis?
                          <button type="btn btn-primary" className={isCommentExist('section12', 'wasHCVReceivedBeforeAfter') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'wasHCVReceivedBeforeAfter', value: wasHCVReceivedBeforeAfter, section: 'section12' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            className="margin-right-radio"
                            required
                            id="Beforewas"
                            checked={wasHCVReceivedBeforeAfter === "Before"}
                            value={"Before"}
                            onChange={(e) =>
                              setWasHCVReceivedBeforeAfter(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Was HCV Treatment Received Before or After', fControlName: 'wasHCVReceivedBeforeAfter', value: wasHCVReceivedBeforeAfter })}
                            name="Was HCV treatment received before or after"
                            type="radio"
                          />
                          <label htmlFor="Beforewas">Before</label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            className="margin-right-radio"
                            id="Afterwas"
                            checked={wasHCVReceivedBeforeAfter === "After"}
                            value={"After"}
                            onChange={(e) =>
                              setWasHCVReceivedBeforeAfter(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Was HCV Treatment Received Before or After', fControlName: 'wasHCVReceivedBeforeAfter', value: wasHCVReceivedBeforeAfter })}
                            name="Was HCV treatment received before or after"
                            type="radio"
                          />
                          <label htmlFor="Afterwas">After</label>
                        </div>
                        <div>
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            className="margin-right-radio"
                            id="Not applicablewas"
                            checked={wasHCVReceivedBeforeAfter === "Not applicable"}
                            value={"Not applicable"}
                            onChange={(e) =>
                              setWasHCVReceivedBeforeAfter(e.target.value)
                            }
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Was HCV Treatment Received Before or After', fControlName: 'wasHCVReceivedBeforeAfter', value: wasHCVReceivedBeforeAfter })}
                            name="Was HCV treatment received before or after"
                            type="radio"
                          />
                          <label htmlFor="Not applicablewas">Not Applicable</label>
                        </div>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>HCV Treatment Type
                          <button type="btn btn-primary" className={isCommentExist('section12', 'hcvTreatmentCVirus') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hcvTreatmentCVirus', value: hcvTreatmentCVirus, section: 'section12' })}></button></label>
                      </div>
                      <div className="chronic-mittal">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
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
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Treatment Type', fControlName: 'hcvTreatmentCVirus', value: hcvTreatmentCVirus })}
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
                            required={!hcvTreatmentCVirus.length}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcv-protease"
                            checked={hcvTreatmentCVirus.includes(
                              "Protease inhibitor"
                            )}
                            // value={"Protease inhibitor"}
                            onChange={() =>
                              handleHCVTreatmentCVirus("Protease inhibitor")
                            }
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Treatment Type', fControlName: 'hcvTreatmentCVirus', value: hcvTreatmentCVirus })}
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-protease" className="mL5">Protease Inhibitor</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!hcvTreatmentCVirus.length}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcv-peg"
                            checked={hcvTreatmentCVirus.includes("Peg interferon")}
                            // value={"Peg interferon"}
                            onChange={() =>
                              handleHCVTreatmentCVirus("Peg interferon")
                            }
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Treatment Type', fControlName: 'hcvTreatmentCVirus', value: hcvTreatmentCVirus })}
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-peg" className="mL5">Peg Interferon</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!hcvTreatmentCVirus.length}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcv-ribavirin"
                            checked={hcvTreatmentCVirus.includes("Ribavirin")}
                            // value={"Ribavirin"}
                            onChange={() => handleHCVTreatmentCVirus("Ribavirin")}
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Treatment Type', fControlName: 'hcvTreatmentCVirus', value: hcvTreatmentCVirus })}
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-ribavirin" className="mL5">Ribavirin</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!hcvTreatmentCVirus.length}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcv-interferon"
                            checked={hcvTreatmentCVirus.includes("Interferon alpha")}
                            // value={"Interferon alpha"}
                            onChange={() =>
                              handleHCVTreatmentCVirus("Interferon alpha")
                            }
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Treatment Type', fControlName: 'hcvTreatmentCVirus', value: hcvTreatmentCVirus })}
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-interferon" className="mL5">Interferon Alpha</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!hcvTreatmentCVirus.length}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcv-unknown"
                            checked={hcvTreatmentCVirus.includes("Unknown")}
                            // value={"Unknown"}
                            onChange={() => handleHCVTreatmentCVirus("Unknown")}
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Treatment Type', fControlName: 'hcvTreatmentCVirus', value: hcvTreatmentCVirus })}
                            name="HCV treatment typeC"
                            type="checkbox"
                          />
                          <label htmlFor="hcv-unknown" className="mL5">Unknown</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!hcvTreatmentCVirus.length}
                            disabled={role === "ROLE_REVIEWER"}
                            id="hcv-notreatment"
                            checked={hcvTreatmentCVirus.includes(
                              "No treatment received"
                            )}
                            // value={"No treatment received"}
                            onChange={() =>
                              handleHCVTreatmentCVirus("No treatment received")
                            }
                            onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Treatment Type', fControlName: 'hcvTreatmentCVirus', value: hcvTreatmentCVirus })}
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
                        <label className="label-txt" style={{ fontWeight: 600 }}>When was HCV Treated (year)
                          <button type="btn btn-primary" className={isCommentExist('section12', 'hcvTreatedYear') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hcvTreatedYear', value: hcvTreatedYear, section: 'section12' })}></button></label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        required
                        //   min={1900}
                        //   max={2024}
                        placeholder="YYYY"
                        value={hcvTreatedYear}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,4}$/.test(inputValue)) {
                            setHCVTreatedYear(e.target.value);
                          }
                        }}
                        onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'When was HCV Treated (year)', fControlName: 'hcvTreatedYear', value: hcvTreatedYear })}
                        className="form-control"
                        type="text"
                        style={{ width: 100 }}
                      />
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is HCV Viral Load after Treatment Known?
                          <button type="btn btn-primary" className={isCommentExist('section12', 'hcvViralLoadAfterTreatment') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hcvViralLoadAfterTreatment', value: hcvViralLoadAfterTreatment, section: 'section12' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          required
                          disabled={role === "ROLE_REVIEWER"}
                          id="treament-hcv-yes"
                          checked={hcvViralLoadAfterTreatment === "Yes"}
                          value={"Yes"}
                          onChange={(e) =>
                            setHcvViralLoadAfterTreatment(e.target.value)
                          }
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Is HCV Viral Load after Treatment Known?', fControlName: 'hcvViralLoadAfterTreatment', value: hcvViralLoadAfterTreatment })}
                          name="Is HCV viral load after treatment known?"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="treatment-hcv-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
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
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Is HCV Viral Load after Treatment Known?', fControlName: 'hcvViralLoadAfterTreatment', value: hcvViralLoadAfterTreatment })}
                          name="Is HCV viral load after treatment known?"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="treatment-hcv-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
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
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Is HCV Viral Load after Treatment Known?', fControlName: 'hcvViralLoadAfterTreatment', value: hcvViralLoadAfterTreatment })}
                          name="Is HCV viral load after treatment known?"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="treatment-hcv-unknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>HCV Viral Load Post Treatment
                          <button type="btn btn-primary" className={isCommentExist('section12', 'hcvPostTreatment') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hcvPostTreatment', value: hcvPostTreatment, section: 'section12' })}></button></label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        required={hcvViralLoadAfterTreatment === "Yes"}
                        disabled={
                          hcvViralLoadAfterTreatment !== "Yes" || role === "ROLE_REVIEWER"
                        }
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
                        onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'HCV Viral Load Post Treatment', fControlName: 'hcvPostTreatment', value: hcvPostTreatment })}
                      />
                      <label className="mL5">IU/mL</label>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Sustained virological response (SVR) after HCV treatment (undetectable HCV RNA 12 weeks after completion of treatment)
                          <button type="btn btn-primary" className={isCommentExist('section12', 'sustainedHCV') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'sustainedHCV', value: sustainedHCV, section: 'section12' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="sustained-yes"
                          checked={sustainedHCV === "Yes"}
                          value={"Yes"}
                          onChange={(e) => setSustainedHcv(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Sustained Virological response (SVR) after', fControlName: 'sustainedHCV', value: sustainedHCV })}
                          name="Sustained virological response (SVR) after"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="sustained-yes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="sustained-no"
                          checked={sustainedHCV === "No"}
                          value={"No"}
                          onChange={(e) => setSustainedHcv(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Sustained Virological response (SVR) after', fControlName: 'sustainedHCV', value: sustainedHCV })}
                          name="Sustained virological response (SVR) after"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="sustained-no">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          // className="margin-right-radio"
                          id="sustained-unknown"
                          checked={sustainedHCV === "Unknown"}
                          value={"Unknown"}
                          onChange={(e) => setSustainedHcv(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Sustained Virological response (SVR) after', fControlName: 'sustainedHCV', value: sustainedHCV })}
                          name="Sustained virological response (SVR) after"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="sustained-unknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Year SVR Achieved
                          <button type="btn btn-primary" className={isCommentExist('section12', 'yearSVRHCV') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'yearSVRHCV', value: yearSVRHCV, section: 'section12' })}></button></label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        required
                        //   min={1900}
                        //   max={2024}
                        id="year-svr-hcc"
                        value={yearSVRHCV}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,4}$/.test(inputValue)) {
                            setYearSVRHCV(e.target.value);
                          }
                        }}
                        onBlur={() => handleAuditDetails({ id: 12, name: 'Hepatitis C virus (HCV) data within 6 months of HCC diagnosis', fName: 'Year SVR Achieved', fControlName: 'yearSVRHCV', value: yearSVRHCV })}
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
                <Fade>
                  <div className="card p-3">
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is Date of HBV diagnosis Known?
                          <button type="btn btn-primary" className={isCommentExist('section13', 'isDateHBVDiagnosis') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'isDateHBVDiagnosis', value: isDateHBVDiagnosis, section: 'section13' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          required
                          id="is-Date-BVirusYes"
                          value={"Yes"}
                          onChange={(e) => setIsDateHBVDiagnosis(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Is Date of HBV diagnosis Known?', fControlName: 'isDateHBVDiagnosis', value: isDateHBVDiagnosis })}
                          checked={isDateHBVDiagnosis === "Yes"}
                          name="Is date of HBV diagnosis known?"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="is-Date-BVirusYes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="is-Date-BVirusNo"
                          value={"No"}
                          onChange={(e) => {
                            if (isDateHBVDiagnosis === "Yes") {
                              setDateOfHBVBVirus("");
                            } else {
                              setDateOfHBVBVirus("");
                            }
                            setIsDateHBVDiagnosis(e.target.value);
                          }}
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Is Date of HBV diagnosis Known?', fControlName: 'isDateHBVDiagnosis', value: isDateHBVDiagnosis })}
                          checked={isDateHBVDiagnosis === "No"}
                          name="Is date of HBV diagnosis known?"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="is-Date-BVirusNo">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="is-Date-BVirusUnknown"
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
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Is Date of HBV diagnosis Known?', fControlName: 'isDateHBVDiagnosis', value: isDateHBVDiagnosis })}
                          name="Is date of HBV diagnosis known?"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="is-Date-BVirusUnknown">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Date of HBV Diagnosis
                          <button type="btn btn-primary" className={isCommentExist('section13', 'dateOfHBVBVirus') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'dateOfHBVBVirus', value: dateOfHBVBVirus, section: 'section13' })}></button></label>
                      </div>
                      <div className="col-sm-3">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={isDateHBVDiagnosis !== "Yes" || role === "ROLE_REVIEWER"}
                          type="date"
                          value={dateOfHBVBVirus}
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            const [year, month, day] = inputDate.split("-");
                            const limitedYear = year.slice(0, 4);
                            const formattedDate = `${limitedYear}-${month}-${day}`;
                            setDateOfHBVBVirus(formattedDate);
                          }}
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Date of HBV Diagnosis', fControlName: 'dateOfHBVBVirus', value: dateOfHBVBVirus })}
                          className="form-control"
                        />
                        {/* <DatePicker
                          wrapperClassName='w-full'
                          selected={dateOfHBVBVirus}
                          disabled={isDateHBVDiagnosis !== "Yes" || role === "ROLE_REVIEWER"}
                          onChange={date => setDateOfHBVBVirus(date)}
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Date of HBV Diagnosis', fControlName: 'dateOfHBVBVirus', value: dateOfHBVBVirus })}
                          startDate={dateOfHBVBVirus}
                          dateFormat={'dd/MMM/yyyy'}
                          className="form-control date"
                          placeholderText="DD/MMM/YYYY"
                        /> */}
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>Is HBV Viral Load Known
                          <button type="btn btn-primary" className={isCommentExist('section13', 'isHBViralBVirus') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'isHBViralBVirus', value: isHBViralBVirus, section: 'section13' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          required
                          className="margin-right-radio"
                          checked={isHBViralBVirus === "Yes"}
                          value={"Yes"}
                          onChange={(e) => {
                            setIsHBViralBVirus(e.target.value);
                          }}
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Is HBV Viral Load Known', fControlName: 'isHBViralBVirus', value: isHBViralBVirus })}
                          id="is HBV viral load knownYes"
                          name="Is HBV viral load known"
                          type="radio"
                        />
                        <label htmlFor="is HBV viral load knownYes">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          checked={isHBViralBVirus === "No"}
                          className="margin-right-radio mL5"
                          value={"No"}
                          onChange={(e) => {
                            if (isHBViralBVirus === "Yes") {
                              setHBVviralTimeOfHCCDiagnosis("");
                            } else {
                              setHBVviralTimeOfHCCDiagnosis("");
                            }
                            setIsHBViralBVirus(e.target.value);
                          }}
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Is HBV Viral Load Known', fControlName: 'isHBViralBVirus', value: isHBViralBVirus })}
                          id="is HBV viral load knownNo"
                          name="Is HBV viral load known"
                          type="radio"
                        />
                        <label htmlFor="is HBV viral load knownNo">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          className="margin-right-radio mL5"
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
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Is HBV Viral Load Known', fControlName: 'isHBViralBVirus', value: isHBViralBVirus })}
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
                          <button type="btn btn-primary" className={isCommentExist('section13', 'HBVviralTimeOfHCCDiagnosis') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'HBVviralTimeOfHCCDiagnosis', value: HBVviralTimeOfHCCDiagnosis, section: 'section13' })}></button>
                        </label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={isHBViralBVirus !== "Yes" || role === "ROLE_REVIEWER"}
                        value={HBVviralTimeOfHCCDiagnosis}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,10}$/.test(inputValue)) {
                            setHBVviralTimeOfHCCDiagnosis(e.target.value);
                          }
                        }}
                        onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'HBV Viral Load at Time of HCC Diagnosis', fControlName: 'HBVviralTimeOfHCCDiagnosis', value: HBVviralTimeOfHCCDiagnosis })}
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
                          <button type="btn btn-primary" className={isCommentExist('section13', 'wasHBVReceivedBeforeAfter') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'wasHBVReceivedBeforeAfter', value: wasHBVReceivedBeforeAfter, section: 'section13' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          checked={wasHBVReceivedBeforeAfter === "Before"}
                          value={"Before"}
                          onChange={(e) => setWasHBVReceivedBeforeAfter(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Was HBV Treatment Received Before or After', fControlName: 'wasHBVReceivedBeforeAfter', value: wasHBVReceivedBeforeAfter })}
                          id="Beforewas"
                          name="Was HBV treatment received before or after B"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="Beforewas">Before</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          checked={wasHBVReceivedBeforeAfter === "After"}
                          value={"After"}
                          onChange={(e) => setWasHBVReceivedBeforeAfter(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Was HBV Treatment Received Before or After', fControlName: 'wasHBVReceivedBeforeAfter', value: wasHBVReceivedBeforeAfter })}
                          id="afterwas"
                          name="Was HBV treatment received before or after B"
                          className="chronicliver-ww margin-right-radio"
                          style={{ marginLeft: 20 }}
                          type="radio"
                        />
                        <label htmlFor="afterwas">After</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          checked={wasHBVReceivedBeforeAfter === "Not applicable"}
                          value={"Not applicable"}
                          onChange={(e) => setWasHBVReceivedBeforeAfter(e.target.value)}
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Was HBV Treatment Received Before or After', fControlName: 'wasHBVReceivedBeforeAfter', value: wasHBVReceivedBeforeAfter })}
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
                        <label className="label-txt" style={{ fontWeight: 600 }}>HBV Treatment Type
                          <button type="btn btn-primary" className={isCommentExist('section13', 'hcvTreatmentBVirus') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hcvTreatmentBVirus', value: hcvTreatmentBVirus, section: 'section13' })}></button></label>
                      </div>
                      <div className="col-sm-8">
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            required={!hcvTreatmentBVirus.length}
                            id="lamivudineHcv"
                            checked={hcvTreatmentBVirus.includes("Lamivudine")}
                            // value={"Lamivudine"}
                            onChange={() => handleHCVTreatmentBVirus("Lamivudine")}
                            onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'HBV Treatment Type', fControlName: 'hcvTreatmentBVirus', value: hcvTreatmentBVirus })}
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="lamivudineHcv" className="mL5">Lamivudine</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="tenofovirHcv"
                            required={!hcvTreatmentBVirus.length}
                            checked={hcvTreatmentBVirus.includes("Tenofovir")}
                            // value={"Tenofovir"}
                            onChange={() => handleHCVTreatmentBVirus("Tenofovir")}
                            onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'HBV Treatment Type', fControlName: 'hcvTreatmentBVirus', value: hcvTreatmentBVirus })}
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="tenofovirHcv" className="mL5">Tenofovir</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="entecavirHcv"
                            required={!hcvTreatmentBVirus.length}
                            checked={hcvTreatmentBVirus.includes("Entecavir")}
                            // value={"Entecavir"}
                            onChange={() => handleHCVTreatmentBVirus("Entecavir")}
                            onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'HBV Treatment Type', fControlName: 'hcvTreatmentBVirus', value: hcvTreatmentBVirus })}
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="entecavirHcv" className="mL5">Entecavir</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="enterferonHcv"
                            required={!hcvTreatmentBVirus.length}
                            checked={hcvTreatmentBVirus.includes("Interferon alpha")}
                            // value={"Interferon alpha"}
                            onChange={() =>
                              handleHCVTreatmentBVirus("Interferon alpha")
                            }
                            onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'HBV Treatment Type', fControlName: 'hcvTreatmentBVirus', value: hcvTreatmentBVirus })}
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="enterferonHcv" className="mL5">Interferon Alpha</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            disabled={role === "ROLE_REVIEWER"}
                            id="unknownHcv"
                            required={!hcvTreatmentBVirus.length}
                            checked={hcvTreatmentBVirus.includes("Unknown")}
                            // value={"Unknown"}
                            onChange={() => handleHCVTreatmentBVirus("Unknown")}
                            onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'HBV Treatment Type', fControlName: 'hcvTreatmentBVirus', value: hcvTreatmentBVirus })}
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="unknownHcv" className="mL5">Unknown</label>
                        </div>
                        <div className="mittal-bottom">
                          <input
                            onKeyDown={handleKeyPress}
                            required={!hcvTreatmentBVirus.length}
                            disabled={role === "ROLE_REVIEWER"}
                            id="no-treatmentHcv"
                            checked={hcvTreatmentBVirus.includes(
                              "No treatment received"
                            )}
                            // value={"No treatment received"}
                            onChange={() =>
                              handleHCVTreatmentBVirus("No treatment received")
                            }
                            onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'HBV Treatment Type', fControlName: 'hcvTreatmentBVirus', value: hcvTreatmentBVirus })}
                            name="HCV treatment type B"
                            type="checkbox"
                          />
                          <label htmlFor="no-treatmentHcv" className="mL5">
                            No Treatment Received
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>When was HBV Treated (year)
                          <button type="btn btn-primary" className={isCommentExist('section13', 'dateOfHBVTreatmentYear') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'dateOfHBVTreatmentYear', value: dateOfHBVTreatmentYear, section: 'section13' })}></button></label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        disabled={role === "ROLE_REVIEWER"}
                        type="text"
                        value={dateOfHBVTreatmentYear}
                        //   min={1900}
                        //   max={2024}

                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\d{0,4}$/.test(inputValue)) {
                            setDateOfHBVTreatmentYear(e.target.value);
                          }
                        }}
                        onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'When was HBV Treated (year)', fControlName: 'dateOfHBVTreatmentYear', value: dateOfHBVTreatmentYear })}
                        placeholder="YYYY"
                        className="form-control"
                        style={{ width: 100 }}
                      />
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          Is HBV Viral Load after Treatment Known?
                          <button type="btn btn-primary" className={isCommentExist('section13', 'hbvViralLoadAfterTreatment') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hbvViralLoadAfterTreatment', value: hbvViralLoadAfterTreatment, section: 'section13' })}></button>
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          required
                          id="yes-hbv-after"
                          checked={hbvViralLoadAfterTreatment === "Yes"}
                          value={"Yes"}
                          onChange={(e) =>
                            setHbvViralLoadAfterTreatment(e.target.value)
                          }
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Is HBV Viral Load after Treatment Known?', fControlName: 'hbvViralLoadAfterTreatment', value: hbvViralLoadAfterTreatment })}
                          name="Is HBV viral load after treatment known? B"
                          className="chronicliver-ww margin-right-radio"
                          type="radio"
                        />
                        <label htmlFor="yes-hbv-after">Yes</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="no-hbv-after"
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
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Is HBV Viral Load after Treatment Known?', fControlName: 'hbvViralLoadAfterTreatment', value: hbvViralLoadAfterTreatment })}
                          name="Is HBV viral load after treatment known? B"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="no-hbv-after">No</label>
                        <input
                          onKeyDown={handleKeyPress}
                          disabled={role === "ROLE_REVIEWER"}
                          id="unknown-hbv-after"
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
                          onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'Is HBV Viral Load after Treatment Known?', fControlName: 'hbvViralLoadAfterTreatment', value: hbvViralLoadAfterTreatment })}
                          name="Is HBV viral load after treatment known? B"
                          className="chronicliver-ww margin-right-radio mL5"
                          type="radio"
                        />
                        <label htmlFor="unknown-hbv-after">Unknown</label>
                      </div>
                    </div>
                    <div className="container-width" style={{ width: '100%', marginTop: 10 }}>
                      <div className="col-sm-4">
                        <label className="label-txt" style={{ fontWeight: 600 }}>
                          HBV Viral Load Post Treatment
                          <button type="btn btn-primary" className={isCommentExist('section13', 'hbvPostTreatment') ? "cBtn cExists" : "cBtn cNExists"} onClick={(e) => handleComments({ e, fControlName: 'hbvPostTreatment', value: hbvPostTreatment, section: 'section13' })}></button>
                        </label>
                      </div>
                      <input
                        onKeyDown={handleKeyPress}
                        required={hbvViralLoadAfterTreatment === "Yes"}
                        disabled={
                          hbvViralLoadAfterTreatment !== "Yes" || role === "ROLE_REVIEWER"
                        }
                        id="hbv-post-treatment"
                        value={hbvPostTreatment}
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          if (/^\d{0,10}$/.test(inputValue)) {
                            setHbvPostTreatment(e.target.value);
                          }
                        }}
                        onBlur={() => handleAuditDetails({ id: 13, name: 'Hepatitis B virus (HBV) data within 6 months of HCC diagnosis', fName: 'HBV Viral Load Post Treatment', fControlName: 'hbvPostTreatment', value: hbvPostTreatment })}
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
          </div>
          {/* Logs Container */}
          <div className="study-container">
            <div className="studyData-container">
              <h1 className="study-txt">Logs</h1>
              <button type="button" onClick={logUpHandle} className="study-btn">
                {logUp ? <ArrowDownward /> : <ArrowUpward />}
              </button>
            </div>
            <div className={logUp ? "study-data" : ""}>
              <Fade>
                <div className="card p-3">
                  <div className="row">
                    <div className="col-sm-3">
                      <label className="label-txt">Created By:</label>
                      <div>
                        <span>{createdBy}</span>
                      </div>
                      {/* <input
                        onKeyDown={handleKeyPress}
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 14, name: 'Logs', fName: 'Created By', fControlName: 'createdBy', value: createdBy })}
                        disabled
                        type="text"
                        className="form-control"
                      /> */}
                    </div>
                    <div className="col-sm-3">
                      <label className="label-txt">Created On:</label>
                      <div>
                        <span>{moment(createdOn, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY, h:mm:ss a')}</span>
                      </div>
                      {/* <input
                        onKeyDown={handleKeyPress}
                        value={createdOn}
                        onChange={(e) => {
                          const inputDate = e.target.value;
                          const [year, month, day] = inputDate.split("-");
                          const limitedYear = year.slice(0, 4);
                          const formattedDate = `${limitedYear}-${month}-${day}`;
                          setCreatedOn(formattedDate);
                        }}
                        onBlur={() => handleAuditDetails({ id: 14, name: 'Logs', fName: 'Created On', fControlName: 'createdOn', value: createdOn })}
                        disabled
                        type="date"
                        className="form-control"
                      /> */}
                      {/* <DatePicker
                        wrapperClassName='w-full'
                        selected={createdOn}
                        disabled
                        onChange={date => setCreatedOn(date)}
                        onBlur={() => handleAuditDetails({ id: 14, name: 'Logs', fName: 'Created On', fControlName: 'createdOn', value: createdOn })}
                        startDate={createdOn}
                        dateFormat={'dd/MMM/yyyy'}
                        className="form-control date"
                        placeholderText="DD/MMM/YYYY"
                      /> */}
                    </div>
                    <div className="col-sm-3">
                      <label className="label-txt">Changed By:</label>
                      <div>
                        <span>{changedBy}</span>
                      </div>
                      {/* <input
                        onKeyDown={handleKeyPress}
                        value={changedBy}
                        onChange={(e) => setChangedBy(e.target.value)}
                        onBlur={() => handleAuditDetails({ id: 14, name: 'Logs', fName: 'Changed By', fControlName: 'changedBy', value: changedBy })}
                        disabled
                        type="text"
                        className="form-control"
                      /> */}
                    </div>
                    <div className="col-sm-3">
                      <label className="label-txt">Changed On:</label>
                      <div>
                        <span>{moment(changedOn, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY, h:mm:ss a')}</span>
                      </div>
                      {/* <input
                        onKeyDown={handleKeyPress}
                        value={changedOn}
                        onChange={(e) => {
                          const inputDate = e.target.value;
                          const [year, month, day] = inputDate.split("-");
                          const limitedYear = year.slice(0, 4);
                          const formattedDate = `${limitedYear}-${month}-${day}`;
                          setChangedOn(formattedDate);
                        }}
                        onBlur={() => handleAuditDetails({ id: 14, name: 'Logs', fName: 'Changed On', fControlName: 'changedOn', value: changedOn })}
                        disabled
                        type="date"
                        className="form-control"
                      /> */}
                      {/* <DatePicker
                        wrapperClassName='w-full'
                        selected={changedOn}
                        disabled
                        onChange={date => setChangedOn(date)}
                        onBlur={() => handleAuditDetails({ id: 14, name: 'Logs', fName: 'Changed On', fControlName: 'changedOn', value: changedOn })}
                        startDate={changedOn}
                        dateFormat={'dd/MMM/yyyy'}
                        className="form-control date"
                        placeholderText="DD/MMM/YYYY"
                      /> */}
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <React.Fragment>
              {role === "ROLE_DATAENTRY" ? (
                <div className="comment-container pt-4">
                  {/* <textarea
                    onKeyDown={handleKeyPress}
                    rows={4}
                    className="form-control"
                    value={commentTxt}
                    onChange={(e) => setCommentTxt(e.target.value)}
                    onBlur={() => handleAuditDetails({ id: 15, name: 'Comments', fName: 'comment', fControlName: 'commentTxt', value: commentTxt })}
                  ></textarea> */}
                  <div className="d-flex justify-content-end p-4">
                    <button
                      onClick={() => sendRole("ROLE_REVIEWER")}
                      className="btn btn-primary"
                      type="submit"
                    >
                      Submit to Reviewer
                    </button>
                  </div>
                </div>
              ) : (
                <div className="comment-container pt-4">
                  {/* <textarea
                    onKeyDown={handleKeyPress}
                    rows={4}
                    className="form-control"
                    value={commentTxt}
                    onChange={(e) => setCommentTxt(e.target.value)}
                    onBlur={() => handleAuditDetails({ id: 15, name: 'Comments', fName: 'comment', fControlName: 'commentTxt', value: commentTxt })}
                  ></textarea> */}
                  <div className="d-flex justify-content-end p-4">
                    <button
                      onClick={() => sendRole("ROLE_DATAENTRY")}
                      className="btn btn-secondary"
                      type="submit"
                      style={{ marginRight: 10 }}
                    >
                      Send Back to Data Entry
                    </button>
                    <button
                      onClick={() => sendRole("Completed")}
                      className="btn btn-secondary"
                      type="submit"
                    >
                      Completed
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          </div>

          {/* Logs Container */}
        </form>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {
              commentsData && commentSection !== "" && commentFCName !== "" &&
              <textarea className="form-control" rows={2} value={tmpComment} onChange={e => setTmpComment(e.target.value)}></textarea>
              // <textarea className="form-control" rows={2} value={commentsData[commentSection][commentFCName]} onChange={updateComments}></textarea>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" onClick={updateComments}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Reused;
