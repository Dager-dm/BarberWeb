package com.company.barber.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.company.barber.entity.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Long>{

    Optional<Usuario> findByCorreo(String correo);
}
