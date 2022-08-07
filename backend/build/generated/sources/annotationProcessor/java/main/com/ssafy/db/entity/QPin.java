package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QPin is a Querydsl query type for Pin
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPin extends EntityPathBase<Pin> {

    private static final long serialVersionUID = -1219623277L;

    public static final QPin pin = new QPin("pin");

    public final NumberPath<Long> mapSeq = createNumber("mapSeq", Long.class);

    public final StringPath pinColor = createString("pinColor");

    public final StringPath pinContent = createString("pinContent");

    public final StringPath pinLat = createString("pinLat");

    public final StringPath pinLng = createString("pinLng");

    public final NumberPath<Integer> pinOrder = createNumber("pinOrder", Integer.class);

    public final NumberPath<Long> pinSeq = createNumber("pinSeq", Long.class);

    public final NumberPath<Long> userSeq = createNumber("userSeq", Long.class);

    public QPin(String variable) {
        super(Pin.class, forVariable(variable));
    }

    public QPin(Path<? extends Pin> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPin(PathMetadata metadata) {
        super(Pin.class, metadata);
    }

}

