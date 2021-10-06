#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// use crate::handlers::HANDLERS;

use crate::utils::portpicker::get_free_port;

mod commands;
mod utils;
mod handlers;
mod file;

fn main() {
  tauri::Builder::default()
    .invoke_handler(
      tauri::generate_handler![
        get_free_port
      ]
    )
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
