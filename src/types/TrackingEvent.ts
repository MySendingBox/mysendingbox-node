type EventStatus = 'PRIS_EN_CHARGE' | 'A_RETIRER' | 'DISTRIBUE' | 'RETOUR_DESTINATAIRE' | 'INCONNU';

type EventMessage = 'Départ' | 'Pris en charge' | 'En cours de traitement' | 'Attend d\'être retiré au guichet' | 'Pli présenté' | 'Distribué' | 'Retourné à l\'expéditeur' | 'Inconnu';

export interface TrackingEvent {
  status : EventStatus;
  message : EventMessage;
  date : Date;
  _id : string;
  created_at : Date;
}