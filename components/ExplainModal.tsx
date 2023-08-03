"use client";
import useExplainModal from "@/hooks/useExplainModal";
import Modal from "./Modal";

const ExplainModal = () => {
  const uploadModal = useExplainModal();
  const expampleString = "15*5164 19*1655 nėra 44*5162";
  const codesArray = expampleString.split(" ");
  const onChange = (open: boolean) => {
    if (!open) {
      uploadModal.onClose();
    }
  };

  return (
    <Modal
      title=""
      description=""
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <h1 className="font-bold pb-3 text-lg">
        Laiptinių kodai yra įvedami iš kairės į dešinę atskiriant
        TARPU(spacebar).
      </h1>
      <p>
        * Pirmas kodas iš kairės pusės reprezentuoja pirmą laiptinę, antras
        antrą ir taip toliau.
      </p>
      <p>* Jeigu nežinote laiptinės kodo įveskite žodį &quot;nėra&quot;.</p>
      <h1 className="font-bold pt-3 pb-3 text-lg">
        Kodų eilutė ir rezultatas:
      </h1>
      <p className="pb-2">Eilutė - 15*5164 19*1655 nėra 44*5162</p>
      {codesArray.map((item, index) => (
        <div key={index} className="flex items-center">
          <span className="bg-white text-black rounded p-2 m-1">
            {index + 1}
          </span>
          <p className="font-normal dark:text-gray-400 ">{item}</p>
        </div>
      ))}
    </Modal>
  );
};

export default ExplainModal;
