"use client";
import React, { useState } from "react";
import Formstyles from "../styles/Form.module.css";
import Image from "next/image";

const ExamForm = () => {
  const [examInfo, setExamInfo] = useState({
    examName: "",
    examCode: "",
    description: "",
    registrationStart: "",
    registrationEnd: "",
    documentSubmissionEnd: "",
  });

  const [documentPresets, setDocumentPresets] = useState([
    {
      documentName: "",
      description: "",
      required: true,
      format: "",
      maxSize: 0,
      minSize: 0,
      width: 0,
      height: 0,
      uploadInstructions: "",
    },
  ]);

  const handleExamInfoChange = (e) => {
    const { name, value } = e.target;
    setExamInfo({
      ...examInfo,
      [name]: value,
    });
  };

  const handleDocumentPresetChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedPresets = [...documentPresets];
    updatedPresets[index][name] = type === "checkbox" ? checked : value;
    setDocumentPresets(updatedPresets);
  };

  const addDocumentPreset = () => {
    setDocumentPresets([
      ...documentPresets,
      {
        documentName: "",
        description: "",
        required: true,
        format: "",
        maxSize: 0,
        minSize: 0,
        width: 0,
        height: 0,
        uploadInstructions: "",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const combinedData = {
      
        examName: examInfo.examName,
        examCode: examInfo.examCode,
        description: examInfo.description,
        registrationStart: examInfo.registrationStart,
        registrationEnd: examInfo.registrationEnd,
        documentSubmissionEnd: examInfo.documentSubmissionEnd,
        documentPresets: documentPresets.map((preset) => ({
        documentName: preset.documentName,
        description: preset.description,
        required: preset.required,
        format: preset.format,
        maxSize: preset.maxSize,
        minSize: preset.minSize,
        width: preset.width,
        height: preset.height,
        uploadInstructions: preset.uploadInstructions,
      })),
    };
  
    console.log("Combined Object:", combinedData);
  
   
  };
  

  return (
    <form onSubmit={handleSubmit} className={Formstyles.examFormFill}>
      <div className={Formstyles.subdiv1}>
        <div className={Formstyles.subdiv01}>
          <h2>Exam Information</h2>
        </div>

        <div className={Formstyles.subdiv02}>
          <div className={Formstyles.formGroup}>
            <input
              type="text"
              name="examName"
              value={examInfo.examName}
              placeholder="Exam Name"
              onChange={handleExamInfoChange}
              className={Formstyles.input}
              required
            />
          </div>
          <div className={Formstyles.formGroup}>
            <input
              type="text"
              name="examCode"
              value={examInfo.examCode}
              placeholder="Exam Code"
              onChange={handleExamInfoChange}
              className={Formstyles.input}
              required
            />
          </div>
          <div className={Formstyles.formGroup}>
            <textarea
              name="description"
              value={examInfo.description}
              placeholder="Description"
              onChange={handleExamInfoChange}
              className={Formstyles.input}
              required
            />
          </div>
          <div className={Formstyles.formGroup}>
            <input
              type="date"
              name="registrationStart"
              value={examInfo.registrationStart}
              placeholder="Registration Start"
              onChange={handleExamInfoChange}
              className={Formstyles.input}
              required
            />
          </div>
          <div className={Formstyles.formGroup}>
            <input
              type="date"
              name="registrationEnd"
              value={examInfo.registrationEnd}
              placeholder="Registration End"
              onChange={handleExamInfoChange}
              className={Formstyles.input}
              required
            />
          </div>
          <div className={Formstyles.formGroup}>
            <input
              type="date"
              name="documentSubmissionEnd"
              value={examInfo.documentSubmissionEnd}
              placeholder="Document Submission End"
              onChange={handleExamInfoChange}
              className={Formstyles.input}
              required
            />
          </div>
        </div>
      </div>

      <div className={Formstyles.subdiv2}>
      <div className={Formstyles.subdiv01}><h2>Document Presets</h2></div>
      <div className={Formstyles.subdiv03}>     
        {documentPresets.map((preset, index) => (
          <div key={index} className={Formstyles.documentPreset}>
            <div className={Formstyles.formGroup}>
              <input
                type="text"
                name="documentName"
                value={preset.documentName}
                placeholder="Document Name"
                onChange={(e) => handleDocumentPresetChange(index, e)}
                className={Formstyles.input}
                required
              />
            </div>
            <div className={Formstyles.formGroup}>
              <textarea
                name="description"
                value={preset.description}
                placeholder="Description"
                onChange={(e) => handleDocumentPresetChange(index, e)}
                className={Formstyles.input}
                required
              />
            </div>
            <div className={Formstyles.formGroup}>
              <input
                type="text"
                name="format"
                value={preset.format}
                placeholder="Format"
                onChange={(e) => handleDocumentPresetChange(index, e)}
                className={Formstyles.input}
                required
              />
            </div>
            <div className={Formstyles.formGroup}>
              <input
                type="number"
                name="maxSize"
                value={preset.maxSize}
                placeholder="Max Size (KB)"
                onChange={(e) => handleDocumentPresetChange(index, e)}
                className={Formstyles.input}
                required
              />
            </div>
            <div className={Formstyles.formGroup}>
              <input
                type="number"
                name="minSize"
                value={preset.minSize}
                placeholder="Min Size (KB)"
                onChange={(e) => handleDocumentPresetChange(index, e)}
                className={Formstyles.input}
                required
              />
            </div>
            <div className={Formstyles.formGroup}>
              <input
                type="number"
                name="width"
                value={preset.width}
                placeholder="Width (px)"
                onChange={(e) => handleDocumentPresetChange(index, e)}
                className={Formstyles.input}
              />
            </div>
            <div className={Formstyles.formGroup}>
              <input
                type="number"
                name="height"
                value={preset.height}
                placeholder="Height (px)"
                onChange={(e) => handleDocumentPresetChange(index, e)}
                className={Formstyles.input}
              />
            </div>
            <div className={Formstyles.formGroup}>
              <textarea
                name="uploadInstructions"
                value={preset.uploadInstructions}
                placeholder="Upload Instructions"
                onChange={(e) => handleDocumentPresetChange(index, e)}
                className={Formstyles.input}
                required
              />
            </div>
            <div className={Formstyles.formGroup}>
              <input
                type="checkbox"
                name="required"
                checked={preset.required}
                onChange={(e) => handleDocumentPresetChange(index, e)}
                className={Formstyles.input}
              />
            </div>
            <div className={Formstyles.line}>

            </div>
          </div>
        ))}


        </div>
        <div className={Formstyles.subdiv04}>     
      
      <Image alt="add image" height={35} width={35} src={"/add.png"}  onClick={addDocumentPreset}/>
      </div>
      

        <button type="submit" className={Formstyles.button}>
          Submit Exam
        </button>
      </div>
    </form>
  );
};

export default ExamForm;
