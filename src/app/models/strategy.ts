// Units: seconds per page.
export enum DefaultReadingPace {
  Close = 480,
  Slow = 240,
  Normal = 120,
  Fast = 60,
  Superfast = 30,
  Glance = 15
}

export enum DefaultReadingPurpose {
  Browse = 'Browse',
  Absorb = 'Absorb',
  Search = 'Search',
}

export class Strategy {
  pace: number = DefaultReadingPace.Normal;
  purpose: string = DefaultReadingPurpose.Absorb;
  // the duratoiin can be automatically calculated given the pages or length mutiply by pace or assigned manually by the user, or calculated by dividing by overall assigned time.
  duration = 0;
}
