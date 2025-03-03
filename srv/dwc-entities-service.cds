using {R_GV001_DMF as R_GV001} from './external/R_GV001_DMF';

service DataService {

    function getGreeting() returns String;

    @readonly
    entity R_GV001_DMF as projection on R_GV001.R_GV001_DMF;

}