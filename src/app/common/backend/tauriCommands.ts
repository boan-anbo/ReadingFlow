import {tauri} from "@tauri-apps/api";
import {invoke} from "@tauri-apps/api/tauri";

// public methods
export enum ETauriCommands {
  getFreePort = "get_free_port"
}

export const runTauriCommand = async <T>(cmd: ETauriCommands): Promise<T> =>  {
  return (await invoke(cmd)) as T
}

// run to automatically check all avaialble Tauri commands.
export const checkTauriCommands = async () => {
  for (const c of allTauriCommandTests) {
    await testCommand(c.name, c.testCondition);
  }
}

// tests
const allTauriCommandTests: TauriCommandTest[] = [
  {
    name: ETauriCommands.getFreePort,
    testCondition: (r) => typeof r == "number"
  }
]


const testCommand = async (cmdName: string, testCondition: (n: any) => boolean) => {
  let result = await tauri.invoke(cmdName);
  if (testCondition) {
    console.warn(`TAURI CHECK SUCCESS: ${cmdName}`);
  } else {
    console.error(`TAURI CHECK FAILED: ${cmdName}`);
  }
}

class TauriCommandTest {
  name: ETauriCommands;
  testCondition: (n: any) => boolean
}


