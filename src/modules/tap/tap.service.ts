import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

import { collection, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@app/config/firebaseConfig';

import axios from 'axios';

// import { Tap } from '@app/db/entity/Tap';

import { getRandomIntegerInRange } from 'src/helpers';

import { getConfig } from '@app/config';

const { CRON_PING_URL } = getConfig();

import {
  AVERAGE_TAPS_PER_SECOND,
  ENERGY_INCREASE_PER_SECOND,
} from '@app/constants';

@Injectable()
export class TapService {
  constructor() {}
  // constructor(
  //   @InjectRepository(Tap)
  //   private readonly tapRepository: Repository<Tap>,
  // ) {}

  // createTapEntity(tap: Partial<Tap>) {
  //   return this.tapRepository.create(tap);
  // }

  // saveTap(tap: Tap) {
  //   return this.tapRepository.save(tap);
  // }

  async tapFirebase() {
    const tapsCollectionRef = collection(db, 'taps');
    const querySnapshot = await getDocs(tapsCollectionRef);

    for (const doc of querySnapshot.docs) {
      const docRef = doc.ref;
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const {
          maxEnergy,
          reachedEnergyPerTap,
          nextTapTime,
          serviceURL,
          token,
        } = docSnap.data();

        const nextTapTimeFormatted = nextTapTime.toDate();

        const rowTapTime =
          maxEnergy / AVERAGE_TAPS_PER_SECOND / reachedEnergyPerTap;
        const extraEnergy = rowTapTime * ENERGY_INCREASE_PER_SECOND;
        const totalEnergy = Math.floor(maxEnergy + extraEnergy);

        const totalTapTime =
          totalEnergy / AVERAGE_TAPS_PER_SECOND / reachedEnergyPerTap;

        const currentDateTime = new Date();
        const millisecondsToNextTap =
          (Math.ceil(maxEnergy / ENERGY_INCREASE_PER_SECOND + totalTapTime) +
            20) *
          1000;
        const newNextTapTime = new Date(
          currentDateTime.getTime() + millisecondsToNextTap,
        );

        if (nextTapTimeFormatted > currentDateTime) {
          return;
        }

        const count = Math.floor(
          getRandomIntegerInRange(totalEnergy - 150, totalEnergy) /
            reachedEnergyPerTap,
        );
        const availableTaps = totalEnergy - count * reachedEnergyPerTap;

        const body: {
          count: number;
          availableTaps: number;
          timestamp: number;
        } = {
          count,
          availableTaps,
          timestamp: +new Date().getTime().toString().slice(0, -3),
        };

        try {
          console.log('TAP TIME!');

          await axios.post(serviceURL, body, {
            headers: { Authorization: token },
          });

          await updateDoc(docRef, { nextTapTime: newNextTapTime });

          console.log('DONE!');
        } catch (error) {
          console.log('ERROR ==>', error);
        }
      }
    }
  }

  // async tapLocalPostgreSQL(userId: number, service: string) {
  //   const tapInDb = await this.tapRepository.findOne({
  //     where: { userId, service },
  //   });

  //   if (!tapInDb) {
  //     throw new NotFoundException();
  //   }

  //   const rowTapTime =
  //     tapInDb.maxEnergy / AVERAGE_TAPS_PER_SECOND / tapInDb.reachedEnergyPerTap; // 8000 / 6 / 15
  //   const extraEnergy = rowTapTime * ENERGY_INCREASE_PER_SECOND;
  //   const totalEnergy = Math.floor(tapInDb.maxEnergy + extraEnergy);

  //   const totalTapTime =
  //     totalEnergy / AVERAGE_TAPS_PER_SECOND / tapInDb.reachedEnergyPerTap;

  //   const currentDateTime = new Date();
  //   const millisecondsToNextTap =
  //     (Math.ceil(
  //       tapInDb.maxEnergy / ENERGY_INCREASE_PER_SECOND + totalTapTime,
  //     ) +
  //       20) *
  //     1000;
  //   const newNextTapTime = new Date(
  //     currentDateTime.getTime() + millisecondsToNextTap,
  //   );

  //   if (!tapInDb.nextTapTime) {
  //     await this.saveTap({ ...tapInDb, nextTapTime: newNextTapTime });
  //     return;
  //   }

  //   if (tapInDb.nextTapTime > currentDateTime) {
  //     return;
  //   }

  //   const count = Math.floor(
  //     getRandomIntegerInRange(totalEnergy - 150, totalEnergy) /
  //       tapInDb.reachedEnergyPerTap,
  //   );
  //   const availableTaps = totalEnergy - count * tapInDb.reachedEnergyPerTap;

  //   const body: { count: number; availableTaps: number; timestamp: number } = {
  //     count,
  //     availableTaps,
  //     timestamp: +new Date().getTime().toString().slice(0, -3),
  //   };

  //   try {
  //     console.log('TAP TIME!');
  //     console.log('body LOCAL ==>', body);

  //     await axios.post(tapInDb.serviceURL, body, {
  //       headers: { Authorization: tapInDb.token },
  //     });

  //     await this.saveTap({ ...tapInDb, nextTapTime: newNextTapTime });

  //     console.log('DONE!');
  //   } catch (error) {
  //     console.log('ERROR ==>', error);
  //   }
  // }

  async ping() {
    const res = await axios.get(CRON_PING_URL);
    return `PING successful! ==> ${res.data}`;
  }
}
