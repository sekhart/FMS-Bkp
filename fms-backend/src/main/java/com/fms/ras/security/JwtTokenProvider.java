package com.fms.ras.security;


import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

/* 
* <pre>
 * Revision History:
 * Version Date             Author           	Changes
 * -----------------------------------------------------------------------------
 * 1.0     29 Aug 2020       Sekhar		Initial coding
 *
 * </pre>
 */
@Component
public class JwtTokenProvider {
	
	@Value("${app.jwtSecret}")
	private String jwtSecret;
	
	@Value("${app.jwtExpirationInMs}")
	private int jwtExpirationInMs;
	
	public String generateToken(Authentication authentication) {
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
		return Jwts.builder().setSubject(Long.toString(userPrincipal.getId())).setIssuedAt(now)
				.setExpiration(expiryDate).signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}
	
	public Long getUsersIdFromJwt(String token) {
		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		return Long.parseLong(claims.getSubject());
	}
	
	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
			return true;
		}catch(ExpiredJwtException e) {
			System.err.println("Expired Jwt token");
			e.printStackTrace();
		}catch (UnsupportedJwtException e) {
			System.err.println("Unsupported Jwt token");
			e.printStackTrace();
		}catch (SignatureException e) {
			System.err.println("Invalid Jwt Signature");
			e.printStackTrace();
		}catch(MalformedJwtException e) {
			System.err.println("Invalid Jwt Token");
			e.printStackTrace();
		}catch (IllegalArgumentException e) {
			System.err.println("Jwt is empty");
			e.printStackTrace();
		}
		return false;
	}

}
