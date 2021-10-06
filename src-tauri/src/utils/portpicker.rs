use portpicker::Port;


#[tauri::command]
pub async fn get_free_port() -> u16 {
  portpicker::pick_unused_port().expect("Cannot get available port") as u16
}

#[cfg(test)]
mod test_get_free_port {
  use crate::utils::portpicker::get_free_port;

  #[test]
  pub fn test_get_free_port() {
    let result = get_free_port();
  }
}
