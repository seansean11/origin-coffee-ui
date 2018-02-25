import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.origincoffee.biznet{
   export enum Country {
      COLOMBIA,
      GUATEMALA,
      HONDURAS,
      BRAZIL,
   }
   export abstract class Owner extends Participant {
      ownerId: string;
   }
   export class Farmer extends Owner {
      firstName: string;
      lastName: string;
      country: Country;
      region: string;
   }
   export class Vendor extends Owner {
      businessName: string;
   }
   export class Coffee extends Asset {
      coffeeId: string;
      pounds: number;
      organic: boolean;
      harvestedAt: Date;
      variety: string;
      owner: Owner;
   }
   export class Trade extends Transaction {
      newOwner: Owner;
      coffee: Coffee;
   }
// }
