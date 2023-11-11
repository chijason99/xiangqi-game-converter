"use client";
import { useState, useRef } from "react";
import Input from "./components/Input";
import FormGroup from "./components/FormGroup";
import Button from "./components/Button";
export default function Home() {
  const [selectedPgnFile, setSelectedPgnFile] = useState<File | null>(null);
  // const fileInputRef = useRef<HTMLInputElement | null>(null)
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if(file == null) return
    if(!file.name.toLowerCase().endsWith(".pgn")){
      e.target.value = "";
      return alert("The uploaded file must be in a pgn format")
    }
    return setSelectedPgnFile(file)
  }
  function handleUploadFile(e: React.FormEvent) {
    e.preventDefault();
    //TODO send file to the server and get a response
  }
  return (
    <main className="flex justify-center items-center flex-col h">
      <section className="p-5 text-md md:text-5xl text-center">
        Convert Your xiangqi PGN file into PDF or GIF
      </section>
      <form
        className="max-w-full flex flex-col justify-center items-center px-2 py-3 gap-2"
        onSubmit={(e) => handleUploadFile(e)}
      >
        <FormGroup>
          <label htmlFor="pgnFile" className="text-center text-xl md:text-3xl p-2 font-bold w-full inline-block">
            Upload PGN file:
          </label>
          <Input
            type="file"
            id="pgnFile"
            accept=".pgn"
            onChange={(e) => handleFileChange(e)}
            className="inline-block mx-auto p-2 w-fit"
            // ref = {fileInputRef}
          />
        </FormGroup>
        <Button type={"submit"}>Upload</Button>
      </form>
    </main>
  );
}
