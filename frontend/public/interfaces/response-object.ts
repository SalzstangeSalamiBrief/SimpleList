import ListItem from './list-item';

export default interface ResponseObject {
  err: string;
  succ: Array<ListItem> | ListItem;
}
