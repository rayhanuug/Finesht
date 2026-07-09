
import { Alternatif, Kriteria } from "./ahpLogic";

export const MATRIKS_ALTERNATIF_AHP: Record<
  Alternatif,
  Record<Kriteria, number>
> = {
  emas: {
    return: 0.058,
    risk: 0.204,
    likuiditas: 0.116,
    modal: 0.166,
    timeHorizon: 0.070,
  },
  deposito: {
    return: 0.037,
    risk: 0.204,
    likuiditas: 0.042,
    modal: 0.040,
    timeHorizon: 0.271,
  },
  rdpu: {
    return: 0.058,
    risk: 0.204,
    likuiditas: 0.214,
    modal: 0.166,
    timeHorizon: 0.271,
  },
  obligasi: {
    return: 0.096,
    risk: 0.118,
    likuiditas: 0.065,
    modal: 0.040,
    timeHorizon: 0.117,
  },
  rdpt: {
    return: 0.096,
    risk: 0.118,
    likuiditas: 0.116,
    modal: 0.166,
    timeHorizon: 0.117,
  },
  campuran: {
    return: 0.157,
    risk: 0.073,
    likuiditas: 0.116,
    modal: 0.166,
    timeHorizon: 0.070,
  },
  rdSaham: {
    return: 0.249,
    risk: 0.047,
    likuiditas: 0.116,
    modal: 0.166,
    timeHorizon: 0.042,
  },
  saham: {
    return: 0.249,
    risk: 0.033,
    likuiditas: 0.214,
    modal: 0.093,
    timeHorizon: 0.042,
  },
};