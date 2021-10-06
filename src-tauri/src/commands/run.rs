use std::process::Command;
use std::string::FromUtf8Error;

fn run_rust_command(command: &str, target: Option<&str>) -> Result<String, FromUtf8Error> {
  let output = if cfg!(target_os = "windows") {
    Command::new("cmd")
      .args(["/C", command, target.unwrap_or("")])
      .output()
      .expect("failed to execute process")
  } else {
    Command::new("sh")
      .args(["/c", command, target.unwrap_or("")])
      .output()
      .expect("failed to execute process")
  };
  String::from_utf8(
    output.stdout
  )
}

#[cfg(test)]
mod test_run_command {
  use crate::commands::run::run_rust_command;

  #[test]
  fn test_run_command() {
    // let result = run_rust_command("java -jar", Some(r"./libs/cabinet.jar"));
    let result = run_rust_command("C:/Users/gazag/RiderProjects/rf-core/RfCore/bin/Release/net5.0/win-x64/rfcore.exe ", None );
    println!("{}", &result.unwrap());
  }
}
