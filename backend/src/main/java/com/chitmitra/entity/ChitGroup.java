package com.chitmitra.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "chit_groups")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChitGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "total_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "monthly_contribution", nullable = false, precision = 15, scale = 2)
    private BigDecimal monthlyContribution;

    @Column(name = "duration_months", nullable = false)
    private Integer durationMonths;

    @Column(name = "max_members", nullable = false)
    private Integer maxMembers;

    @Column(name = "current_members")
    private Integer currentMembers = 0;

    @Column(name = "status")
    private String status = "OPEN"; // OPEN, IN_PROGRESS, COMPLETED, CANCELLED

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;
}
